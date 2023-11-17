const renderOrders = async () => {
  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((orders) => {
        let innerHTML = ``;
        orders.forEach((order) => {
          innerHTML += `<div class="orders__item">
          <div class="orders__row">
            <span style="font-weight: 700">Пицца</span>${order.pizza}
          </div>
          <div class="orders__row">
            <span style="font-weight: 700">Заказчик</span>${order.name}
          </div>
          <div class="orders__row">
            <span style="font-weight: 700">Номер</span>${order.phone}
          </div>
          <div class="orders__row">
            <span style="font-weight: 700">Адрес</span>${order.address}
          </div>
          <button id="delete__button" onclick="deleteOrder('${order._id}')">
            Удалить заказ
          </button>
        </div>`;
        });
        document.getElementById("orders__container").innerHTML = innerHTML;
      });
  } catch (error) {
    alert('Ошибка запроса на сервер')
  }
};

const deleteOrder = async (id) => {
  try {
    let response = await fetch(url + `${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }); 
    if (response.ok) {
      await renderOrders();
    } else {
      alert("Ошибка запроса");
    }
  } catch (error) {
    alert("Ошибка запроса " + error);
  }
};

let url = "https://pizza-time-api.onrender.com/";
renderOrders();

