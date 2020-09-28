// User 모델 정의
// 모델을 정의하는 건 define 메서드이고 파라미터는 ("객체이름",스키마 정의,테이블 설정)
module.exports = function (sequelize,DataTypes){
    let user = sequelize.define("user",{
        user_id : {
            field: "user_id",
            type : DataTypes.STRING(50),
            unique: true,
            primaryKey : true,
            allowNull : false
        },
        password : {
            field : "password",
            type : DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        underscored : true,
        freezeTableName : true,
        tableName : "user"
    });
    return user;
}
