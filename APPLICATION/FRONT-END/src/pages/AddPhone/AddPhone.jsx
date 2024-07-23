import axios from "axios";
import { useEffect, useState, useRef } from "react";

function AddPhone() {

  const [phoneList, setPhoneList] = useState([])

  // Add Stock
  const stockCount = useRef();
  const phoneID = useRef();
  const phoneUpdateMessage = useRef();

  // Add Phone
  const phoneBrand = useRef();
  const phoneModel = useRef();
  const phoneColor = useRef();
  const phoneStorage = useRef();
  const phoneRam = useRef();
  const phonePrice = useRef();
  const phoneStockCount = useRef();
  const phoneAddMessage = useRef();

  // Remove Phone
  const removePhoneMessage = useRef();

  useEffect(() => {
    axios.get("http://localhost:3001/check-phone").then(response => {
      setPhoneList(response.data)
    })
  }, [])

  function addStock() {
    if (stockCount.current.value > 0) {
      axios.post("http://localhost:3001/add-stock", {
        stok: stockCount.current.value,
        id: phoneID.current.value
      }).then(response => {
        if (response.data == "1") {
          phoneUpdateMessage.current.innerHTML = `
            <div class="alert alert-success" role="alert">
              Stok başarı ile eklendi!
            </div>
        `;
        }
        else {
          phoneUpdateMessage.current.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Stok eklenirken bir hata oluştu!
            </div>
      `;
        }
      }).catch(err => {
        console.log(err)
      })
    }
    else {
      phoneUpdateMessage.current.innerHTML = `
        <div class="alert alert-warning" role="alert">
          Lütfen geçerli bir stok adeti giriniz!
        </div>
      `;
    }
  }

  function addPhone() {
    // Değerleri al
    const brandValue = phoneBrand.current.value.trim();
    const modelValue = phoneModel.current.value.trim();
    const colorValue = phoneColor.current.value.trim();
    const storageValue = phoneStorage.current.value.trim();
    const ramValue = phoneRam.current.value.trim();
    const priceValue = phonePrice.current.value.trim();
    const stockCountValue = phoneStockCount.current.value.trim();

    // Boş olma koşulunu kontrol et
    if (!brandValue || !modelValue || !colorValue || !storageValue || !ramValue || !priceValue || !stockCountValue) {
      phoneAddMessage.current.innerHTML = `
      <div class="alert alert-warning" role="alert">
        Lütfen tüm alanları doldurunuz!
      </div>
    `;
    } else {
      axios.post("http://localhost:3001/add-phone", {
        brandValue,
        modelValue,
        colorValue,
        storageValue,
        ramValue,
        priceValue,
        stockCountValue
      }).then(response => {
        if (response.data == "1") {
          phoneAddMessage.current.innerHTML = `
            <div class="alert alert-success" role="alert">
              Telefon kayıt işlemi başarılı, lütfen sayfayı yenileyiniz!
            </div>
        `;
        }
        else {
          phoneAddMessage.current.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Telefon kayıt işlemi sırasında bir hata meydana geldi!
            </div>
        `;
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  function removePhone(e) {
    var response = confirm("Silmek istediğinize emin misiniz?");
    if (response) {
      const phoneID = e.target.id;
      axios.post("http://localhost:3001/remove-phone", {
        phoneID
      }).then(response => {
        if (response.data == "1") {
          removePhoneMessage.current.innerHTML = `
            <div class="alert alert-success" role="alert">
              Telefon silme işlemi başarılı!
            </div>
        `;
        }
        else {
          removePhoneMessage.current.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Telefon silme işlemi sırasında bir hata meydana geldi!
            </div>
        `;
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <>
      <div class="container mt-4">

        <div class="row mb-4">
          <div class="col-md-6">
            <h4>Stok Ekle</h4>
            <div class="form-group">
              <label for="telefonModel">Telefon Modeli:</label>
              <select ref={phoneID} class="form-control" id="telefonModel">
                {phoneList.map(e => (
                  <option key={e.id} value={e.id}>{e.marka} {e.model} {e.marka} {e.renk} {e.depolama} GB {e.marka} {e.ram}</option>
                ))}
              </select>
            </div>
            <div class="form-group">
              <label for="stokMiktari">Stok Miktarı:</label>
              <input ref={stockCount} type="number" class="form-control" id="stokMiktari" placeholder="Stok miktarını giriniz" />
            </div>
            <button onClick={addStock} class="btn btn-primary mt-4">Stok Ekle</button>
          </div>
          <div ref={phoneUpdateMessage}></div>
          <hr />
          <div class="col-md-6">
            <h4>Yeni Telefon Ekle</h4>
            <div class="form-group">
              <label for="marka">Marka:</label>
              <input ref={phoneBrand} type="text" class="form-control" id="marka" placeholder="Marka giriniz" />
            </div>
            <div class="form-group">
              <label for="model">Model:</label>
              <input ref={phoneModel} type="text" class="form-control" id="model" placeholder="Model giriniz" />
            </div>
            <div class="form-group">
              <label for="renk">Renk:</label>
              <input ref={phoneColor} type="text" class="form-control" id="renk" placeholder="Renk giriniz" />
            </div>
            <div class="form-group">
              <label for="depolama">Depolama:</label>
              <input ref={phoneStorage} type="text" class="form-control" id="depolama" placeholder="Depolama kapasitesi giriniz" />
            </div>
            <div class="form-group">
              <label for="ram">RAM:</label>
              <input ref={phoneRam} type="text" class="form-control" id="ram" placeholder="RAM miktarı giriniz" />
            </div>
            <div class="form-group">
              <label for="fiyat">Fiyat:</label>
              <input ref={phonePrice} type="text" class="form-control" id="fiyat" placeholder="Fiyat giriniz" />
            </div>
            <div class="form-group">
              <label for="stokMiktari">Stok Miktarı:</label>
              <input ref={phoneStockCount} type="number" class="form-control" id="stokMiktari" placeholder="Stok miktarı giriniz" />
            </div>
            <button onClick={addPhone} class="btn btn-primary mt-4">Ekle</button>
            <div ref={phoneAddMessage}></div>
          </div>
        </div >
        <hr />
        <div class="row">
          <div class="col">
            <div ref={removePhoneMessage}></div>
            <h4>Tüm Telefon Modelleri</h4>
            <ul class="list-group">
              {phoneList.map(e => (
                <li key={e.id} id={e.id} class="list-group-item d-flex justify-content-between align-items-center mb-4">
                  {e.marka} {e.model} {e.marka} {e.renk} {e.depolama} GB {e.marka} {e.ram}
                  <button onClick={removePhone} id={e.id} type="button" class="btn btn-danger btn-sm">Sil</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div >
    </>
  );
}

export default AddPhone
