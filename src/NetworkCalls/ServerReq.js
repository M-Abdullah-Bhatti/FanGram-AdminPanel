import { axiosInstance } from "../axios";

export const getProducts = async () => {
	try {
		const response = await axiosInstance.get("admin/getproduct");
		return response;
	} catch (error) {
		return error.response.data.message;
	}
};
export const deleteProducts = async (id) => {
	try {
		const response = await axiosInstance.delete(
			`admin/deleteproduct/?productId=${id}`
		);
		return response;
	} catch (error) {
		return error.response.data.message;
	}
};
export const addProduct = async (Product) => {
	try {
		const response = await axiosInstance.post(`admin/addproduct`, Product);
		return response;
	} catch (error) {
		return error.response.data.message;
	}
};
export const updateProduct = async (Product, id) => {
	try {
		const response = await axiosInstance.put(
			`admin/editproduct?productId=${id}`,
			Product
		);
		return response;
	} catch (error) {
		return error.response.data.message;
	}
};

// Category Requests

export const GetAllCategories = async () => {
	try {
		const response = await axiosInstance.get("admin/getAllCategories");
		return response.data;
	} catch (error) {
		return error.response.message;
	}
};

export const AddCategory = async (Category) => {
	try {
		const response = await axiosInstance.post(`admin/addCategory`, Category);
		return response;
	} catch (error) {
		return error.response.data.message;
	}
};

export const RemoveCategory = async (id) => {
	try {
		const response = await axiosInstance.delete(
			`admin/removeCategory/?categoryId=${id}`
		);
		return response;
	} catch (error) {
		return error.response.data.message;
	}
};

export const HighlightProduct = async (id) => {
	try {
		const response = await axiosInstance.get(
			`admin/hightlight?productId=${id}`
		);
		console.log(response);
		return response;
	} catch (error) {
		return error.response.data.message;
	}
};

// Etag Requests
export const AddAsset = async (asset) => {
	try {
		const response = await axiosInstance.post(`admin/postasset`, asset);
		return response;
	} catch (error) {
		// console.log(error)
		return error.response.data.message;
	}
};

export const GetAllAssets = async () => {
	try {
		const response = await axiosInstance.get("admin/getAsset");
		return response.data;
	} catch (error) {
		console.log(error)
		return error.response.data.message;
	}
};
