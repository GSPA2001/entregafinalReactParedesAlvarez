const products = [
    {
        id: 1,
        name:'Ceviche',
        price:3200,
        category: 'entradas',
        image:"https://elsabornorteno.000webhostapp.com/img/entradas/ceviche.png",
        stock:5,
        descripction: 'pez cocinado con limon'
    },
    {
        id: 2,
        name:'Ceviche Mixto',
        price:5000,
        category: 'entradas',
        image:"https://elsabornorteno.000webhostapp.com/img/entradas/ceviche-mixto.png",
        stock:5,
        descripction: 'pez cocinado con limon y mariscos'
    },
    {
        id: 3,
        name:'Tamales',
        price:800,
        category: 'entradas',
        image:"https://elsabornorteno.000webhostapp.com/img/entradas/tamales.png",
        stock:10,
        descripction: 'Masa de maiz rellena'
    },
    {
        id: 4,
        name:'Arroz',
        price:700,
        category: 'extras',
        image:"https://elsabornorteno.000webhostapp.com/img/extras/arroz.png",
        stock:10,
        descripction: 'solo arroz'
    },
    {
        id: 5,
        name:'Ensalada',
        price:750,
        category: 'extras',
        image:"https://elsabornorteno.000webhostapp.com/img/extras/ensalada-mixta.png",
        stock:10,
        descripction: 'Lechuga, tomate y cebolla'
    },
    {
        id:6,
        name:'Pollo dorado',
        price:1700,
        category: 'principales',
        image:"https://elsabornorteno.000webhostapp.com/img/principales/pollo%20dorado.png",
        stock:10,
        descripction: '1/4 de pollo con papas y ensalada'
    },
    {
        id:7,
        name:'Cabrito',
        price:4000,
        category: 'principales',
        image:"https://elsabornorteno.000webhostapp.com/img/principales/cabrito.png",
        stock:10,
        descripction: 'chivito a la olla, acompañado de arroz y porotos'
    },
    {
        id:8,
        name:'Lomito Saltado',
        price:3500,
        category: 'principales',
        image:"https://elsabornorteno.000webhostapp.com/img/principales/lomo-saltado.png",
        stock:10,
        descripction: 'carne al wok acompañada de arroz y papas fritas'
    },
    {
        id:9,
        name:'Chaufa',
        price:3000,
        category: 'principales',
        image:"https://elsabornorteno.000webhostapp.com/img/principales/arroz-chaufa.png",
        stock:10,
        descripction: 'Arroz con carne, pollo, salchichas y huevo'
    },
    {
        id:10,
        name:'Chaufa de Mariscos',
        price:4500,
        category: 'principales',
        image:"https://elsabornorteno.000webhostapp.com/img/principales/arrozchaufaconmariscos.png",
        stock:10,
        descripction: 'Arroz con mariscos y verduras ahumadas'
    },
    {
        id:11,
        name:'Rabas',
        price:5000,
        category: 'principales',
        image:"https://elsabornorteno.000webhostapp.com/img/principales/rabas.png",
        stock:10,
        descripction: 'Rabas, con papas fritas y ensalada'
    },
    {
        id:12,
        name:'Jalea',
        price:5800,
        category: 'principales',
        image:"https://elsabornorteno.000webhostapp.com/img/principales/jalea-da-mariscos.png",
        stock:10,
        descripction: 'Trozos de aros de calamar, pescado acompañados de papas fritas y ensalada'
    }
]
export const getProducts = () => {
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve(products)
        }, 500)
    })
}

export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const id = parseInt(productId); 
            resolve(products.find(prod => prod.id === id)); 
        }, 500);
    });
};

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category.toLowerCase() === categoryId.toLowerCase()))
        }, 500)
    })
};