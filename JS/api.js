const heandleCatagory = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    // console.log(data.data.news_category);

    const tabContainer = document.getElementById('tabContainer');
    // Singel Cetagory find Out!!!!!!!!!!!
    data.data.news_category.slice(0,5).forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML=`<a onclick="heandleId('${category.category_id}')" class="ml-20 tab text-xl font-semibold hover:bg-green-600 hover:text-white">${category.category_name}</a>`
        tabContainer.appendChild(div);
    });
}

// Click Tab

const heandleId = async (categoryId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await res.json();
    console.log(data.data);
    newsContainer.innerHTML = '';
    data.data?.forEach((news) =>{
        const newsContainer = document.getElementById('newsContainer');
        const div = document.createElement('div');
        div.classList = `card w-96 bg-base-100 shadow-xl mt-7`
        div.innerHTML =`
        <figure><img src="${news?.image_url}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title text-2xl font-bold">${news?.title}</h2>
                  <p>${news.details.slice(0,120)}</p>
                  <p class="text-lg font-medium">Total View :${news?.total_view? news?.total_view : ' no views'}</p>
                  <p class="text-sm font-normal">Author :${news?.author?.name}</p>
                  <p class="text-sm font-normal ">Published Date :${news?.author?.published_date}</p>
                  <button onclick="heandelModal('${news._id}')" class="btn btn-outline btn-secondary w-[100px]">Details</button>
                </div> `
        
        newsContainer.appendChild(div);
    })
}

const heandelModal =async (newsId)=>{
    // Data Colect
    const res = await fetch(` https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await res.json();
    console.log(data);


    const modalContaiter = document.getElementById('modalContaiter')
    const div = document.createElement('div');
    div.innerHTML= `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>
    `
    modalContaiter.appendChild(div);
    const modal = document.getElementById('my_modal_5');
    modal.showModal();

}
heandleCatagory();
heandleId('01')