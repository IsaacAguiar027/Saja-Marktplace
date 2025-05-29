import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { isAuthenticated, user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "My Profile - LocalMarket";
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error('Name and email are required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await updateProfile({
        name,
        email,
        phone,
        location,
        avatar,
      });
      
      if (success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-teal-600 py-4 px-6">
            <h1 className="text-white text-xl font-bold">My Profile</h1>
          </div>
          
          <div className="p-6">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Camera size={16} className="text-gray-600" />
                  </button>
                )}
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      id="email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Phone size={18} />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <MapPin size={18} />
                    </span>
                    <input
                      type="text"
                      id="location"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setName(user?.name || '');
                        setEmail(user?.email || '');
                        setPhone(user?.phone || '');
                        setLocation(user?.location || '');
                        setAvatar(user?.avatar || '');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;