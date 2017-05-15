const forms =
    {
        Program: 'ProgramHead DeclarePart ProgramBody',
        ProgramHead: 'PROGRAM ProgramName',
        ProgramName: 'ID',

        DeclarePart: 'TypeDecpart VarDecpart ProcDecpart',

        TypeDecpart: 'ε | TypeDec',
        TypeDec: 'TYPE TypeDecList',
        TypeDecList: 'TypeId = TypeDef ; TypeDecMore',
        TypeDecMore: 'ε | TypeDecList',
        TypeId: 'ID',

        TypeDef: 'BaseType | StructureType | ID',
        BaseType: 'INTEGER | CHAR',
        StructureType: 'ArrayType | RecType',
        ArrayType: 'ARRAY [ Low .. Top ] OF BaseType',
        Low: 'INTC',
        Top: 'INTC',
        RecType: 'RECORD FieldDecList END',
        FieldDecList: 'BaseType IdList ; FieldDecMore | ArrayType IdList ; FieldDecMore',
        FieldDecMore: 'ε | FieldDecList',
        IdList: 'ID IdMore',
        IdMore: 'ε | , IdList',

        VarDecpart: 'ε | VarDec',
        VarDec: 'VAR VarDecList',
        VarDecList: 'TypeDef VarIdList ; VarDecMore',
        VarDecMore: 'ε | VarDecList',
        VarIdList: 'ID VarIdMore',
        VarIdMore: 'ε | , VarIdList',

        ProcDecpart: 'ε | ProcDec',
        ProcDec: 'PROCEDURE ProcName ( ParamList ) ; ProcDecPart ProcBody ProcDecMore',
        ProcDecMore: 'ε | ProcDec',
        ProcName: 'ID',

        ParamList: 'ε | ParamDecList',
        ParamDecList: 'Param ParamMore',
        ParamMore: 'ε | ; ParamDecList',
        Param: 'TypeDef FormList | VAR TypeDef FormList',
        FormList: 'ID FidMore',

        FidMore: 'ε | , FormList',

        ProcDecPart: 'DeclarePart',

        ProcBody: 'ProgramBody',

        ProgramBody: 'BEGIN StmList END',

        StmList: 'Stm StmMore',
        StmMore: 'ε | ; StmList',

        Stm: 'ConditionalStm | LoopStm | InputStm | OutputStm | ReturnStm | ID AssCall',

        AssCall: 'AssignmentRest | CallStmRest',

        AssignmentRest: 'VariMore := Exp',

        ConditionalStm: 'IF RelExp THEN StmList ELSE StmList FI',

        LoopStm: 'WHILE RelExp DO StmList ENDWH',

        InputStm: 'READ ( Invar ) ',

        Invar: 'ID',

        OutputStm: 'WRITE ( Exp ) ',

        ReturnStm: 'RETURN',

        CallStmRest: '( ActParamList )',

        ActParamList: 'ε | Exp ActParamMore',

        ActParamMore: 'ε | ,ActParamList',

        RelExp: 'Exp OtherRelE',
        OtherRelE: 'CmpOp Exp',

        Exp: 'Term OtherTerm',
        OtherTerm: 'ε | AddOp Exp',

        Term: 'Factor OtherFactor',
        OtherFactor: 'ε | MultOp Term',

        Factor: '( Exp ) | INTC | Variable',
        Variable: 'ID VariMore',
        VariMore: 'ε | [ Exp ] | . FieldVar',

        FieldVar: 'ID FieldVarMore',
        FieldVarMore: 'ε | [ Exp ]',

        CmpOp: '< | =',
        AddOp: '+ | -',
        MultOp: '* | /'
    };

const result = [];
for ( let key in forms)
{
    const right_items = forms[key].split('|');
    right_items.forEach(function(e)
    {
        let form =
            {
                left: key,
                right: e.trim()
            };
        // console.log(form);
        result.push(form);
    });
}

module.exports = result;
// console.log(result.length);