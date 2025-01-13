import React from 'react';
import UpdateAccount from '../components/forms/account/UpdateAccountForm';
import TokenManager from '../services/TokenManager';

function UpdateAccountPage() {
    const userId = TokenManager.getClaims()?.userId; 
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
  
    // Check if the user is logged in or if the token has expired
    useEffect(() => {
      const checkToken = () => {
        const token = TokenManager.getAccessToken();
        if (!token) {
          navigate('/login'); // No token, redirect to login
          return;
        }
  
        // Decode the token and check for expiration
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          TokenManager.clear(); // Clear expired token
          navigate('/login'); // Redirect to login if token is expired
        }
      };
  
      checkToken();
    }, [navigate]);
  
    const handleSuccess = () => {
        alert('Account information has been successfully updated!');
    };

    return (
        <div>
            <UpdateAccount userId={userId} onSuccess={handleSuccess} />
        </div>
    );
}

export default UpdateAccountPage;