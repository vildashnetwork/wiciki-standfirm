   import FriendRequests from "../FriendRequests/FriendRequests";
   import SuggestedMentors from "../SuggestedMentors/SuggestedMentors"
        const Sidebar = () => {
            return (
                <div className="sidebarshow">
                    <FriendRequests />
                    <SuggestedMentors />
                </div>
            );
        };
export default Sidebar