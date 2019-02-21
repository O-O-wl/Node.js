module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('user', { //두번쨰 인자 칼럼정의
            name: {
                type:DataTypes.STRING(20), // TYPE(크기)
                allowNull:false, // NOT NULL
                unique:true, // UNIQUE
            },
            age: {
                type:DataTypes.INTEGER.UNSIGNED, // 양수만 허용
                allowNull:false,


            },
            married: {
                type:DataTypes.BOOLEAN,// 양수만 허용
                allowNull:false,
            },
            comment: {
                type:DataTypes.TEXT, // 긴 문자열
                allowNull:true,
            },
            create_at: {
                type:DataTypes.DATE,
                allowNull:false,
                defaultValue: sequelize.literal('now()'), // 기본값 설정 
            },
        }
        ,{ // 3번째 인자 시퀄라이저 설정
            timestamps:false,  // 생성일  기록 - 위에 create_at 이 있기에 false
            underscored:true // true - 스네이크 , false - 캐멜

        });
};