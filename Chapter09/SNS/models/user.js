module.exports = (sequelize,DataType) => (
    sequelize.define('user',{
        email:{
            type:DataType.STRING(40),
            allowNull:false,
            unique:true,


        },
        nick:{
            type:DataType.STRING(15),
            allowNull:false,
        },
        password:{
            type:DataType.STRING(100),
            allowNull:true, // 필수 아닌이유 O-Auth 가능하기때문
        },
        provider:{
            type:DataType.STRING(10),
            allowNull:false,
            defaultValue:'local',
        },//local,kakao

        snsId:{
            type:DataType.STRING(30),
            allowNull:true
        }
    },{
        timestamps:true,//생성일 수정일 자동기록
        paranoid:true,// 삭제일 기록  - 데이터 복구에 사용

    }
));

// 부엉이 27 2018-07-20  2018-09-19  // 날짜 두개? 삭제된 로우
// 금붕어 22 2013-11-13              // 아직 삭제되지 않음