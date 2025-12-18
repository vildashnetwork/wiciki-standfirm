

// import React, { useEffect, useState } from "react";
// import "./Gists.css"
// import Stories from "./Stories/Stories";
// import PostCreation from "./PostCreation/PostCreation"
// import FeedPost from "./FeedPost/FeedPost"
// import Feed from "./Feed/Feed"
// import FriendRequests from "./FriendRequests/FriendRequests"
// import SuggestedMentors from "./SuggestedMentors/SuggestedMentors";
// import Sidebar from "./Sidebar/Sidebar"
// import StatusModal from "./StatusModal/StatusModal";
// import AddStatusModal from "./AddStatusModal/AddStatusModal";
// const GistsPage = () => {



//     // LocalStorage utilities
//     const storage = {
//         get: (key) => {
//             try {
//                 const item = localStorage.getItem(key);
//                 return item ? JSON.parse(item) : null;
//             } catch (error) {
//                 console.error('Error reading from localStorage:', error);
//                 return null;
//             }
//         },
//         set: (key, value) => {
//             try {
//                 localStorage.setItem(key, JSON.stringify(value));
//             } catch (error) {
//                 console.error('Error writing to localStorage:', error);
//             }
//         }
//     };

//     // Sample media URLs
//     const sampleImages = [
//         'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
//         'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
//         'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
//         'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
//         'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop'
//     ];

//     const sampleVideos = [
//         'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
//         'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//         'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
//     ];

//     const [posts, setPosts] = useState(() => storage.get('posts') || []);
//     const [stories, setStories] = useState(() => storage.get('stories') || []);
//     const [showStatusModal, setShowStatusModal] = useState(false);
//     const [showAddStatusModal, setShowAddStatusModal] = useState(false);
//     const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

//     // Save to localStorage whenever data changes
//     useEffect(() => {
//         storage.set('posts', posts);
//     }, [posts]);

//     useEffect(() => {
//         storage.set('stories', stories);
//     }, [stories]);

//     useEffect(() => {
//         // Initialize sample data if empty
//         if (posts.length === 0) {
//             const samplePosts = [
//                 {
//                     id: 1,
//                     name: 'Sarah Johnson',
//                     avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
//                     content: 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. 🏔️✨',
//                     timestamp: Date.now() - 2 * 60 * 60 * 1000,
//                     type: 'image',
//                     mediaUrl: sampleImages[0],
//                     liked: false,
//                     likes: 12,
//                     comments: []
//                 },
//                 {
//                     id: 2,
//                     name: 'Mike Chen',
//                     avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
//                     content: 'Excited to share that I just launched my new project! It\'s been months of hard work, but seeing it come to life is incredibly rewarding. 🚀',
//                     timestamp: Date.now() - 4 * 60 * 60 * 1000,
//                     type: 'video',
//                     mediaUrl: sampleVideos[0],
//                     liked: false,
//                     likes: 8,
//                     comments: []
//                 },
//                 {
//                     id: 3,
//                     name: 'Emma Davis',
//                     avatar: 'https://res.cloudinary.com/dbq5gkepx/image/upload/v1756974124/w3tey25aflrc2cl7cpip.jpg',
//                     content: 'Coffee and coding session this morning ☕️ Working on some exciting new features.',
//                     timestamp: Date.now() - 6 * 60 * 60 * 1000,
//                     type: 'text',
//                     mediaUrl: null,
//                     liked: false,
//                     likes: 5,
//                     comments: []
//                 }
//             ];
//             setPosts(samplePosts);
//         }

//         if (stories.length === 0) {
//             const sampleStories = [
//                 {
//                     id: 1,
//                     name: 'Sarah Johnson',
//                     avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
//                     type: 'image',
//                     content: 'Amazing sunset! 🌅',
//                     mediaUrl: sampleImages[1],
//                     backgroundColor: '#e53935',
//                     timestamp: Date.now() - 2 * 60 * 60 * 1000
//                 },
//                 {
//                     id: 2,
//                     name: 'Mike Chen',
//                     avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
//                     type: 'video',
//                     content: 'Just launched my project! 🚀',
//                     mediaUrl: sampleVideos[1],
//                     backgroundColor: '#1976d2',
//                     timestamp: Date.now() - 4 * 60 * 60 * 1000
//                 },
//                 {
//                     id: 3,
//                     name: 'Emma Davis',
//                     avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
//                     type: 'text',
//                     content: 'Coffee and creativity ☕️',
//                     mediaUrl: null,
//                     backgroundColor: '#43a047',
//                     timestamp: Date.now() - 6 * 60 * 60 * 1000
//                 }
//             ];
//             setStories(sampleStories);
//         }
//     }, []);

//     const handleCreatePost = (postData) => {
//         const newPost = {
//             id: Date.now(),
//             name: 'You',
//             avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
//             content: postData.content,
//             type: postData.type,
//             mediaUrl: postData.mediaUrl,
//             timestamp: Date.now(),
//             liked: false,
//             likes: 0,
//             comments: []
//         };
//         setPosts([newPost, ...posts]);
//     };

//     const handleAddStatus = (statusData) => {
//         const newStatus = {
//             id: Date.now(),
//             name: 'You',
//             avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
//             ...statusData,
//             timestamp: Date.now()
//         };
//         setStories([newStatus, ...stories]);
//     };

//     const handleViewStatus = (index) => {
//         setCurrentStatusIndex(index);
//         setShowStatusModal(true);
//     };

//     const handleNextStatus = () => {
//         setCurrentStatusIndex((prev) => (prev + 1) % stories.length);
//     };

//     const handlePrevStatus = () => {
//         setCurrentStatusIndex((prev) => (prev - 1 + stories.length) % stories.length);
//     };

//     const handleLike = (postId) => {
//         setPosts(posts.map(post => {
//             if (post.id === postId) {
//                 const newLiked = !post.liked;
//                 return {
//                     ...post,
//                     liked: newLiked,
//                     likes: newLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 0) - 1)
//                 };
//             }
//             return post;
//         }));
//     };

//     const handleComment = (postId, commentText) => {
//         setPosts(posts.map(post => {
//             if (post.id === postId) {
//                 const newComment = {
//                     text: commentText,
//                     timestamp: Date.now()
//                 };
//                 return {
//                     ...post,
//                     comments: [...(post.comments || []), newComment]
//                 };
//             }
//             return post;
//         }));
//     };

//     const handleLoadMore = () => {
//         const additionalPosts = [
//             {
//                 id: Date.now() + 1,
//                 name: 'Alex Wilson',
//                 avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
//                 content: 'Just wrapped up an amazing team meeting! Excited about the new project we\'re starting next week. 🚀',
//                 timestamp: Date.now() - 8 * 60 * 60 * 1000,
//                 type: 'image',
//                 mediaUrl: sampleImages[Math.floor(Math.random() * sampleImages.length)],
//                 liked: false,
//                 likes: 3,
//                 comments: []
//             },
//             {
//                 id: Date.now() + 2,
//                 name: 'Rachel Green',
//                 avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
//                 content: 'Beautiful sunset from my balcony tonight. Sometimes you need to pause and appreciate the simple moments. 🌅',
//                 timestamp: Date.now() - 10 * 60 * 60 * 1000,
//                 type: 'video',
//                 mediaUrl: sampleVideos[Math.floor(Math.random() * sampleVideos.length)],
//                 liked: false,
//                 likes: 7,
//                 comments: []
//             }
//         ];
//         setPosts([...posts, ...additionalPosts]);
//     };

//     return (
//         <div className="container-manarea">
//             <div className="main-layout">
//                 <div className="main-content">
//                     <Stories
//                         stories={stories}

//                         onViewStatus={handleViewStatus}
//                     />
//                     <PostCreation onCreatePost={handleCreatePost} />
//                     <Feed
//                         posts={posts}
//                         onLoadMore={handleLoadMore}
//                         onLike={handleLike}
//                         onComment={handleComment}
//                     />
//                 </div>
//                 <Sidebar />
//             </div>

//             <StatusModal
//                 isOpen={showStatusModal}
//                 onClose={() => setShowStatusModal(false)}
//                 stories={stories}
//                 currentIndex={currentStatusIndex}
//                 onNext={handleNextStatus}
//                 onPrev={handlePrevStatus}
//             />

//             {/* <AddStatusModal
//                 isOpen={showAddStatusModal}
//                 onClose={() => setShowAddStatusModal(false)}
//                 onAdd={handleAddStatus}
//             /> */}
//         </div>
//     );
// };
// export default GistsPage



// GistsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Gists.css";
import Stories from "./Stories/Stories";
import PostCreation from "./PostCreation/PostCreation";
import Feed from "./Feed/Feed";
import Sidebar from "./Sidebar/Sidebar";
import StatusModal from "./StatusModal/StatusModal";

const BACKEND_POSTS_URL = "https://wiciki-media-backend.onrender.com/api/posts";

const GistsPage = () => {
    const storage = {
        get: (k) => {
            try {
                const v = localStorage.getItem(k);
                return v ? JSON.parse(v) : null;
            } catch (e) {
                console.error("localStorage.get error", e);
                return null;
            }
        },
        set: (k, v) => {
            try {
                localStorage.setItem(k, JSON.stringify(v));
            } catch (e) {
                console.error("localStorage.set error", e);
            }
        },
    };

    // sample media (fallback)
    const sampleImages = [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    ];
    const sampleVideos = [
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ];

    // state
    const [posts, setPosts] = useState(() => storage.get("posts") || []);
    const [stories, setStories] = useState(() => storage.get("stories") || []);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    // persist
    useEffect(() => storage.set("posts", posts), [posts]);
    useEffect(() => storage.set("stories", stories), [stories]);

    // map backend post -> UI shape
    const mapBackendPostToUI = (p) => {
        const createdTs = p.createdAt ? new Date(p.createdAt).getTime() : Date.now();
        const mediaUrl =
            p.contentType === "image"
                ? p.image || null
                : p.contentType === "video"
                    ? p.video || null
                    : p.media?.length > 0
                        ? p.media[0]
                        : null;
        return {
            id: p._id,
            name: p.user?.name || "Unknown",
            avatar: p.user?.picture || null,
            content: p.text || "",
            timestamp: createdTs,
            type: p.contentType || "text",
            mediaUrl,
            liked: false, // you can derive whether current user liked by checking p.likes for user's id if you want
            likes: Array.isArray(p.likes) ? p.likes.length : 0,
            comments: Array.isArray(p.comments) ? p.comments : [],
            raw: p,
        };
    };

    // Fetch posts
    const fetchPosts = async (pageToLoad = 1, append = false) => {
        setLoading(true);
        setFetchError(null);
        try {
            const resp = await axios.get(BACKEND_POSTS_URL, {
                params: { page: pageToLoad, limit },
                timeout: 15000,
            });
            if (resp?.status === 200 && resp.data?.posts) {
                const mapped = resp.data.posts.map(mapBackendPostToUI);
                setPosts((prev) => (append ? [...prev, ...mapped] : mapped));
                setPage(Number(resp.data.page || pageToLoad));
                setTotal(typeof resp.data.total === "number" ? resp.data.total : null);
            } else {
                throw new Error("Unexpected server response");
            }
        } catch (err) {
            console.error("Failed to fetch posts:", err);
            setFetchError(err.message || "Failed to fetch posts");
            // fallback seed if empty
            if (!posts || posts.length === 0) {
                setPosts([
                    {
                        id: "sample-1",
                        name: "Sarah Johnson",
                        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
                        content: "Just finished an amazing hike in the mountains!",
                        timestamp: Date.now() - 2 * 60 * 60 * 1000,
                        type: "image",
                        mediaUrl: sampleImages[0],
                        liked: false,
                        likes: 12,
                        comments: [],
                    },
                ]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(1, false);
        if (!stories || stories.length === 0) {
            setStories([
                {
                    id: "s-1",
                    name: "Sarah Johnson",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                    type: "image",
                    content: "Amazing sunset! 🌅",
                    mediaUrl: sampleImages[1],
                    backgroundColor: "#e53935",
                    timestamp: Date.now() - 2 * 60 * 60 * 1000,
                },
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // UI handlers (local optimistic updates combined with backend calls)

    // Toggle like on post (calls POST /api/posts/:id/like)
    const handleLike = async (postId) => {
        // optimistic update
        setPosts((prev) =>
            prev.map((p) => {
                if (p.id === postId) {
                    const newLiked = !p.liked;
                    return { ...p, liked: newLiked, likes: newLiked ? (p.likes || 0) + 1 : Math.max(0, (p.likes || 0) - 1) };
                }
                return p;
            })
        );

        const token = Cookies.get("token");
        try {
            const resp = await axios.post(
                `${BACKEND_POSTS_URL}/${postId}/like`,
                {}, // body optional { emoji }
                {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 15000,
                }
            );
            // server returns likesCount (we used mapping earlier). Use it to sync.
            if (resp?.data?.likesCount != null) {
                setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes: resp.data.likesCount } : p)));
            }
        } catch (err) {
            console.error("Like post error:", err);
            // revert optimistic change
            setPosts((prev) =>
                prev.map((p) => {
                    if (p.id === postId) {
                        const prevLiked = !p.liked; // previous state was reversed due to optimistic toggle
                        return {
                            ...p,
                            liked: prevLiked,
                            likes: prevLiked ? (p.likes || 0) + 1 : Math.max(0, (p.likes || 0) - 1),
                        };
                    }
                    return p;
                })
            );
            alert("Couldn't toggle like. Try again.");
        }
    };

    // Add a comment (calls POST /api/posts/:id/comment)
    const handleComment = async (postId, commentText) => {
        if (!commentText || !String(commentText).trim()) return;
        // optimistic update: add a temporary comment with id 'temp-<ts>'
        const tempId = `temp-${Date.now()}`;
        const tempComment = { _id: tempId, message: commentText, createdAt: new Date().toISOString(), user: { name: "You" }, likes: [] };

        setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: [...(p.comments || []), tempComment] } : p)));

        const token = Cookies.get("token");
        try {
            const resp = await axios.post(
                `${BACKEND_POSTS_URL}/${postId}/comment`,
                { message: commentText },
                { headers: { Authorization: `Bearer ${token}` }, timeout: 15000 }
            );

            // resp should include the created comment under resp.data.comment
            if (resp?.status === 201 && resp.data?.comment) {
                setPosts((prev) =>
                    prev.map((p) => {
                        if (p.id === postId) {
                            // remove temp comment and append server comment
                            const filtered = (p.comments || []).filter((c) => c._id !== tempId);
                            return { ...p, comments: [...filtered, resp.data.comment] };
                        }
                        return p;
                    })
                );
            } else {
                throw new Error("Unexpected response from server when adding comment");
            }
        } catch (err) {
            console.error("Add comment error:", err);
            // remove temp comment
            setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: (p.comments || []).filter((c) => c._id !== tempId) } : p)));
            alert("Couldn't add comment. Try again.");
        }
    };

    // Toggle like on a comment (calls POST /api/posts/:postId/comment/:commentId/like)
    const handleLikeComment = async (postId, commentId) => {
        // optimistic: toggle by updating likes array length locally (we only store count client-side)
        setPosts((prev) =>
            prev.map((p) => {
                if (p.id !== postId) return p;
                const comments = (p.comments || []).map((c) => {
                    if (String(c._id) !== String(commentId)) return c;
                    const likedByMe = c._likedByMe || false; // _likedByMe is client-side marker
                    const newLiked = !likedByMe;
                    const newLikesArr = newLiked ? [...(c.likes || []), "me"] : (c.likes || []).slice(0, Math.max(0, (c.likes || []).length - 1));
                    return { ...c, likes: newLikesArr, _likedByMe: newLiked };
                });
                return { ...p, comments };
            })
        );

        const token = Cookies.get("token");
        try {
            const resp = await axios.post(
                `${BACKEND_POSTS_URL}/${postId}/comment/${commentId}/like`,
                {},
                { headers: { Authorization: `Bearer ${token}` }, timeout: 15000 }
            );
            // resp returns commentLikesCount (server returns commentLikesCount or similar)
            if (resp?.data?.commentLikesCount != null) {
                setPosts((prev) =>
                    prev.map((p) => {
                        if (p.id !== postId) return p;
                        const comments = (p.comments || []).map((c) => {
                            if (String(c._id) !== String(commentId)) return c;
                            // replace likes array with length resp.data.commentLikesCount — we keep placeholder array of that length
                            const arr = new Array(resp.data.commentLikesCount).fill(null);
                            return { ...c, likes: arr, _likedByMe: resp.data.liked === true };
                        });
                        return { ...p, comments };
                    })
                );
            }
        } catch (err) {
            console.error("Like comment error:", err);
            // revert optimistic toggle by flipping back
            setPosts((prev) =>
                prev.map((p) => {
                    if (p.id !== postId) return p;
                    const comments = (p.comments || []).map((c) => {
                        if (String(c._id) !== String(commentId)) return c;
                        const likedByMe = c._likedByMe || false;
                        const newLiked = !likedByMe;
                        const newLikesArr = newLiked ? [...(c.likes || []), "me"] : (c.likes || []).slice(0, Math.max(0, (c.likes || []).length - 1));
                        return { ...c, likes: newLikesArr, _likedByMe: newLiked };
                    });
                    return { ...p, comments };
                })
            );
            alert("Couldn't toggle comment like. Try again.");
        }
    };

    // create post locally (keeps your previous behavior)
    const handleCreatePost = (postData) => {
        const newPost = {
            id: String(Date.now()),
            name: "You",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            content: postData.content,
            type: postData.type,
            mediaUrl: postData.mediaUrl,
            timestamp: Date.now(),
            liked: false,
            likes: 0,
            comments: [],
        };
        setPosts((prev) => [newPost, ...prev]);
    };

    const handleLoadMore = async () => {
        if (total && posts.length >= total) return;
        await fetchPosts(page + 1, true);
    };

    // status modal controls
    const handleViewStatus = (index) => {
        setCurrentStatusIndex(index);
        setShowStatusModal(true);
    };
    const handleNextStatus = () => setCurrentStatusIndex((i) => (i + 1) % stories.length);
    const handlePrevStatus = () => setCurrentStatusIndex((i) => (i - 1 + stories.length) % stories.length);

    return (
        <div className="container-manarea">
            <div className="main-layout">
                <div className="main-content">
                    <Stories stories={stories} onViewStatus={handleViewStatus} />
                    <PostCreation onCreatePost={handleCreatePost} />
                    <Feed
                        posts={posts}
                        onLoadMore={handleLoadMore}
                        onLike={handleLike}
                        onComment={handleComment}
                        onLikeComment={handleLikeComment}
                        loading={loading}
                        fetchError={fetchError}
                    />
                </div>
                <Sidebar />
            </div>

            <StatusModal
                isOpen={showStatusModal}
                onClose={() => setShowStatusModal(false)}
                stories={stories}
                currentIndex={currentStatusIndex}
                onNext={handleNextStatus}
                onPrev={handlePrevStatus}
            />
        </div>
    );
};

export default GistsPage;
