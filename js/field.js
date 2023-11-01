export const FieldType = {
    FOREST: 1,
    VILLAGE: 2,
    FARM: 4,
    WATER: 8,
    HILL: 16,
    EMPTY: 32
}

export class Field {
    type = FieldType.EMPTY
    surrounded = false

}