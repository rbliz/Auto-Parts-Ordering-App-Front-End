const menuArray = [
    {
        name: "Oil Filter",
        characteristics: ["93mm Hgth.", "61.7mm Diam."],
        id: 0,
        price: 7,
        productImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_je8JZW0XH9o_E6Pbov5XbfSlhGh1ufNvaQ&usqp=CAU`
    },
    {
        name: "Air Filter",
        characteristics: ["254mm Lght.", "182 Width", "35mm Hght."],
        price: 5,
        productImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScinE-gBDdaIa-YNicnIrCHz5k6JOhPGD4NA&usqp=CAU`,
        id: 1
    },
        {
        name: "Oil",
        characteristics: ["5W-30, Penrite, full synthetic, anti-wear package"],
        price: 24,
        productImage: `data:image/jpeg;base64,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`,
        id: 2
    }
]

export default menuArray