import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadImage = (file) => {
	return new Promise((resolve, reject) => {
		const storageRef = ref(storage, `/files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000) /
					10;
				console.log(`Upload is ${progress}% done`);
			},
			(error) => {
				console.log(error);
				reject(error); // Reject the promise with the error
			},
			() => {
				console.log(`Upload is complete, fetching URL...`);
				getDownloadURL(storageRef)
					.then((url) => {
						resolve(url); // Resolve the promise with the URL
					})
					.catch((error) => {
						console.log(error);
						reject(error); // Reject the promise with the error
					});
			}
		);
	});
};
