import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import { storage } from '../firebaseConfig'

const UploadImage  =  (props)=>{
    return new Promise((reslove,reject)=>{
        var date = new Date().getTime()
        // console.log(date)
        // console.log(v4())
        const uploadtask  = ref(storage,`Fangram/${date + props.img.name}`)
        // console.log(v4())
        console.log(uploadtask)
        uploadBytes(uploadtask,props.img)
        .then(()=>{
        // console.log(v4())
                getDownloadURL(ref(storage,`Fangram/${date + props.img.name}`))
                 .then((imageUrl)=>{
                    reslove(imageUrl)
            // console.log('2')
            //     console.log(imageUrl,"image")
                // await imageUrl
            }) 
            .catch((e)=>{
                reject(e)
                console.log(e)
            })
        })
    
    })

    
   

// console.log(props?.img)
    // const uploadtask = storage.ref('blogs').child(props?.img.name).put(props?.img);
    // console.log(uploadtask)
}
export default UploadImage;