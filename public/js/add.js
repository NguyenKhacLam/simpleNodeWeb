import { showAlert } from './alert';

const addCategory = async(name) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/category',
            data: {
                name
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Create successfully!');
            window.setTimeout(() => {
                location.assign('/addcategory');
            }, 1500);
        }
    } catch (error) {
        showAlert('danger', 'Fail!');
        console.log(error.response.data);
    }
}

const cateform = document.querySelector('#addCateForm');
if (cateform) {
    cateform.addEventListener('submit', e => {
        e.preventDefault();
        const cateName = document.getElementById('categoryName').value;
        addCategory(cateName);
    })
}