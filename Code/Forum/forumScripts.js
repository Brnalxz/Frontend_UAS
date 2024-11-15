function addPost() {
    document.getElementById("post-form").style.display = "block";
}

function closePostForm() {
    document.getElementById("post-form").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('post-form-inner');
    const postTitleInput = document.getElementById('post-title-input');
    const postDescInput = document.getElementById('post-desc-input');
    const showPosts = document.getElementById('show-posts');
    const inputFile = document.getElementById("input-file");
    const imageView = document.getElementById("img-view");
    const postImage = document.getElementById("post-img");

    const defPostImage = '/Images/Forum-Images/no-image-default.png';
    const defProfile = '/Images/Forum-Images/default-profile.png';
    const defName = 'username';
    let postImageUrl = null;
    
    loadPosts();

    inputFile.addEventListener("change", uploadImage);

    function uploadImage() {
        postImageUrl = URL.createObjectURL(inputFile.files[0]);
        imageView.style.backgroundImage = `url(${postImageUrl})`;
        imageView.style.border = 0;
        postImage.style.opacity = '0%';
    }

    postForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const showPostTitle = postTitleInput.value.trim();
        const showPostDesc = postDescInput.value.trim();

        if (showPostTitle !== '') {
            const newPost = {
                title: showPostTitle,
                desc: showPostDesc,
                image: postImageUrl || null,
            };

            savePostToLocalStorage(newPost);
            displayPost(newPost);

            postTitleInput.value = '';
            postDescInput.value = '';
            postImage.src = defPostImage;
            imageView.style.backgroundImage = defPostImage;
            imageView.style.border = '2px dashed white';
        }
    });

    function savePostToLocalStorage(post) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => displayPost(post));
    }

    function displayPost(post) {

        const showIndivPost = document.createElement('li');
        showIndivPost.classList.add('show-individual-post');

        const showProfileOnPost = document.createElement('div');
        showProfileOnPost.classList.add('show-profile-on-post');

        const profileImg = document.createElement('img');
        profileImg.src = defProfile;
        profileImg.alt = 'Profile Image';

        const username = document.createElement('h4');
        username.textContent = defName;

        const postOptions = document.createElement('div');
        postOptions.classList.add('post-options');

        const threeDot = document.createElement('i');
        threeDot.classList.add('fa', 'fa-ellipsis-v');

        threeDot.addEventListener('click', function() {
            toggleOptions(threeDot);
        });

        const postOptionsDropdown = document.createElement('ul');
        postOptionsDropdown.classList.add('post-options-dropdown');
        postOptionsDropdown.style.display = 'none';
        postOptionsDropdown.innerHTML = `<li onclick="deletePost(this)">Delete Post</li>`;

        postOptions.appendChild(threeDot);
        postOptions.appendChild(postOptionsDropdown);


        showProfileOnPost.appendChild(postOptions);

        const postTitleDiv = document.createElement('div');
        postTitleDiv.classList.add('show-post-title');
        postTitleDiv.innerHTML = `<h2>${post.title}</h2>`;
        
        const postDescDiv = document.createElement('div');
        postDescDiv.classList.add('show-post-description');
        postDescDiv.innerHTML = `<h3>${post.desc}</h3>`;

        let postImageDiv;
        if (post.image) {
            postImageDiv = document.createElement('div');
            postImageDiv.classList.add('show-post-image');
            const postImageElement = document.createElement('img');
            postImageElement.src = post.image;
            postImageElement.alt = "Post Image";
            postImageDiv.appendChild(postImageElement);
        }
        
        const likeDislikeDiv = document.createElement('div');
        likeDislikeDiv.classList.add('like-dislike');
        
        const likeCount = document.createElement('h3');
        likeCount.textContent = '0';
        
        const likeIcon = document.createElement('i');
        likeIcon.classList.add('fa-solid', 'fa-thumbs-up');
        
        const dislikeCount = document.createElement('h3');
        dislikeCount.textContent = '0';
        
        const dislikeIcon = document.createElement('i');
        dislikeIcon.classList.add('fa-solid', 'fa-thumbs-down');
        
        const commentCount = document.createElement('h3');
        commentCount.textContent = '0';
        
        const commentIcon = document.createElement('i');
        commentIcon.classList.add('fa-solid', 'fa-comment');
        
        showProfileOnPost.appendChild(profileImg);
        showProfileOnPost.appendChild(username);
        
        likeDislikeDiv.appendChild(likeCount);
        likeDislikeDiv.appendChild(likeIcon);
        likeDislikeDiv.appendChild(dislikeCount);
        likeDislikeDiv.appendChild(dislikeIcon);
        likeDislikeDiv.appendChild(commentCount);
        likeDislikeDiv.appendChild(commentIcon);
        
        showIndivPost.appendChild(showProfileOnPost);
        showIndivPost.appendChild(postTitleDiv);
        if (post.image) {
            showIndivPost.appendChild(postImageDiv);
        }
        showIndivPost.appendChild(postDescDiv);
        showIndivPost.appendChild(likeDislikeDiv);
        
        showPosts.appendChild(showIndivPost);
    }
});

function toggleOptions(el) {
    const dropdown = el.nextElementSibling;
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function deletePost(el) {
    const postElement = el.closest('.show-individual-post');
    postElement.remove();
    
    const postTitle = postElement.querySelector('.show-post-title h2').innerText;
    removePostFromLocalStorage(postTitle);
}

function removePostFromLocalStorage(postTitle) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.title !== postTitle);
    localStorage.setItem('posts', JSON.stringify(posts));
}