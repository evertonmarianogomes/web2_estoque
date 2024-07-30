const { route } = window;

export const pages = [
    { name: 'Categorias', link: route('categories.index') },
    { name: 'Produtos', link: route('products.index') },
    { name: 'Vendas', link: route('sales.index') },
    { name: 'Relatórios', link: route('admin.home') },
];