const fs = require('fs');

fs.readdir('./folder',(err,dir)=>{
    if(err){
        throw err;
    }
    console.log('폴더 내용 확인 ',dir);

    fs.unlink('./folder/newfile.js',(err)=>{ /* unlink - 파일 삭제 */
        if(err){
            throw err;
        }
        console.log('파일삭제 성공');
        fs.rmdir('./folder',(err)=>{ /* rmdir - 디렉터러 삭제 */
            if(err){
                throw err;
            }
            console.log('디렉터리 삭제 성공')
        })
    })
});