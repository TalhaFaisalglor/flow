package sql

import (
	"encoding/base64"
	"fmt"
	"strings"

	pf "github.com/estuary/flow/go/protocols/flow"
)

// TableForMaterialization converts a MaterializationSpec into the Table representation that's used
// by Generator. This assumes that the MaterializationSpec has already been validated to
// ensure that each projection has exactly one type besides "null".
func TableForMaterialization(name string, comment string, spec *pf.MaterializationSpec) *Table {
	return &Table{
		Name:    name,
		Comment: comment,
		Columns: columnsForMaterialization(spec),
	}
}

// Returns a slice of Columns for the materialization. This function always puts the root document
// projection at the end, so it's always at a known position for dealing with insert and update
// statements.
func columnsForMaterialization(spec *pf.MaterializationSpec) []Column {
	var allFields = spec.FieldSelection.AllFields()
	var columns = make([]Column, 0, len(allFields))
	for _, field := range allFields {
		var projection = spec.Collection.GetProjection(field)
		columns = append(columns, ColumnForProjection(projection))
	}
	return columns
}

func ColumnForProjection(projection *pf.Projection) Column {
	var column = Column{
		Name:       projection.Field,
		Comment:    commentForProjection(projection),
		PrimaryKey: projection.IsPrimaryKey,
		Type:       columnType(projection),
		NotNull:    projection.Inference.MustExist && !sliceContains("null", projection.Inference.Types),
	}
	if projection.Inference.String_ != nil {
		var s = projection.Inference.String_
		column.StringType = &StringTypeInfo{
			Format:      s.Format,
			ContentType: s.ContentType,
			MaxLength:   s.MaxLength,
		}
	}
	return column
}

func columnType(projection *pf.Projection) ColumnType {
	for _, ty := range projection.Inference.Types {
		switch ty {
		case "string":
			return STRING
		case "integer":
			return INTEGER
		case "number":
			return NUMBER
		case "boolean":
			return BOOLEAN
		case "object":
			return OBJECT
		case "array":
			return ARRAY
		}
	}
	panic("attempt to create column with no non-null type")
}

func commentForProjection(projection *pf.Projection) string {
	var source = "auto-generated"
	if projection.UserProvided {
		source = "user-provided"
	}
	var types = strings.Join(projection.Inference.Types, ", ")
	return fmt.Sprintf("%s projection of JSON at: %s with inferred types: [%s]", source, projection.Ptr, types)
}

func generateApplyStatements(endpoint *Endpoint, spec *pf.MaterializationSpec) ([]string, error) {
	var checkpoints = GazetteCheckpointsTable(endpoint.Tables.Checkpoints)
	var specs = FlowMaterializationsTable(endpoint.Tables.Specs)

	// Like my grandpappy always told me, "never generate a SQL file without a comment at the top"
	var comment = endpoint.Generator.Comment(fmt.Sprintf(
		"Generated by Flow for materializing collection '%s'\nto table: %s",
		spec.Collection.Collection,
		endpoint.Tables.Target,
	))
	var target = TableForMaterialization(endpoint.Tables.Target, comment, spec)

	createCheckpoints, err := endpoint.Generator.CreateTable(checkpoints)
	if err != nil {
		return nil, fmt.Errorf("generating checkpoints schema: %w", err)
	}
	createSpecs, err := endpoint.Generator.CreateTable(specs)
	if err != nil {
		return nil, fmt.Errorf("generating specs schema: %w", err)
	}

	specBytes, err := spec.Marshal()
	if err != nil {
		panic(err) // Cannot fail.
	}
	insertSpec, err := endpoint.Generator.DirectInsertStatement(
		specs, endpoint.Tables.Target, base64.StdEncoding.EncodeToString(specBytes))
	if err != nil {
		return nil, fmt.Errorf("generating spec insert: %w", err)
	}

	createTarget, err := endpoint.Generator.CreateTable(target)
	if err != nil {
		return nil, fmt.Errorf("generating target schema: %w", err)
	}

	return []string{
		createCheckpoints,
		createSpecs,
		insertSpec,
		createTarget,
	}, nil
}
