import { async } from "q";

export const addProduct = async(name, price, description, imagesCover, images, categories, amount, sales, optionName, optionVals) => {
    try {
        optionVals = optionVals.split(",");
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/products',
            data: {
                "name": name,
                "price": price,
                "salesPrice": sales,
                "description": description,
                "categories": categories,
                "amount": amount,
                "imagesCover": imagesCover,
                "images": images,
                "options": [{
                    "nameOption": optionName,
                    "optionVals": optionVals
                }]
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Product Added');
            window.setTimeout(() => {
                location.assign('/addproduct');
            }, 1500);
        }
    } catch (error) {
        showAlert('danger', 'Sign up fail!');
    }
}