
import FILE_SYSTEM from 'fs'

export default class PersistenceManager{
    constructor(){

    }

    fncMakeDirectory(path){
        let success = false;
        try {
            FILE_SYSTEM.mkdirSync(path);    
            success = true;
        } catch (error) {
            success = false;
        }
        return success;
    }

    fncValidateIfExistsPath(path){
        let validate = true;
        if(!FILE_SYSTEM.existsSync(path)){       
            validate= false;
        }
        return validate;
    }

    fncReadFromPersistence(path, filename){
        console.log('[SYSTEM] Leyendo registros en directorio: '+ path);     
        let rawdata = FILE_SYSTEM.readFileSync(path+'/'+filename);
        let obj = JSON.parse(rawdata);
        return obj;
    }

    fncWritePersistence(path, filename, object){     
        let success = false;
        try {
            console.log('[SYSTEM] Guardando registro en directorio: '+ path);
            let json = JSON.stringify(object);
            FILE_SYSTEM.writeFileSync(path+'/'+filename,json);            
            success = true;
        } catch (error) {
            success = false;
            console.log('[SYSTEM] '+ error);
        }           
        return success;
    }

}

// export default PersistenceManager;