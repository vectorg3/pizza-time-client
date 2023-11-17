const btnClick = async () => {
    document.getElementById('submit__button').disabled = true;
    let url = 'https://pizza-time-api.onrender.com/';

    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let pizza = document.getElementById('pizza').value;

    if (validate(name, phone, address)) {
        let user = {
            name: name,
            phone: phone,
            address: address,
            pizza: pizza,
        };

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                document.getElementById('success__notification').style.display =
                    'flex';
                setTimeout(() => {
                    window.open('orders.html', '_self');
                }, 3000);
            } else {
                document.getElementById('fetch__error').style.display = 'flex';
            }
        } catch (error) {
            document.getElementById('fetch__error').style.display = 'flex';
            document.getElementById('submit__button').disabled = false;
        }
    } else {
        document.getElementById('submit__button').disabled = false;
        return;
    }
};

const validate = (name, phone, address) => {
    let isCorrect = true;
    if (name.length <= 1) {
        document.getElementById('name__warn').innerHTML =
            'Длина имени должна быть минимум 5 символов';
        document.getElementById('name__error').style.display = 'flex';
        isCorrect = false;
    }
    let isPhoneNumber = new RegExp(
        /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g
    );
    if (!isPhoneNumber.test(phone)) {
        document.getElementById('phone__warn').innerHTML =
            'Некорректный формат номера телефона';
        document.getElementById('phone__error').style.display = 'flex';
        isCorrect = false;
    }
    if (address.length <= 5) {
        document.getElementById('address__warn').innerHTML =
            'Длина адреса должна быть минимум 6 символов';
        document.getElementById('address__error').style.display = 'flex';
        isCorrect = false;
    }
    if (isCorrect) return true;
    return false;
};
const closeWarning = (field) => {
    document.getElementById(field).style.display = 'none';
};
