'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import Head from 'next/head';
import Image from 'next/image';
import my from "../../../public/next.svg";
import { account } from '@/lib/appwrite'; // Import your Appwrite account service
import { AppwriteException } from 'appwrite'; // Import AppwriteException for type checking
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import Image2 from "../../../public/img/birthday/Cheery-Sunflower-300x300.webp"

// Define a more accurate User type based on Appwrite's Account object
type User = {
  $id: string;
  name: string;
  email: string;
  phone?: string; // Appwrite's Account object might not directly provide a 'phone' field by default
  dob?: string;
  gender?: string;
  membership?: string;
  avatar?: string;
  // Add other properties you fetch from Appwrite or derive
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
  notifications: {
    email: boolean;
    push: boolean;
  };
  twoFactorEnabled: boolean;
};

type Address = {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

type PaymentMethod = {
  id: number;
  type: string;
  last4: string;
  expiry: string;
};

type Order = {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
};

export default function ProfilePage() {
  const router = useRouter(); // Initialize router

  const [user, setUser] = useState<User | null>(null); // Initialize user as null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const loggedInUser = await account.get(); // Attempt to get the current user
        console.log('Fetched user:', loggedInUser); // Log the fetched user to inspect its structure

        // Map Appwrite user data to your local `User` type
        setUser({
          $id: loggedInUser.$id,
          name: loggedInUser.name,
          email: loggedInUser.email,
          phone: loggedInUser.phone || '', // Appwrite's account object might not have 'phone' directly. You might need to add it to your Appwrite User attributes.
          dob: loggedInUser.prefs?.dob || '', // Example: assuming dob is in user preferences
          gender: loggedInUser.prefs?.gender || '', // Example: assuming gender is in user preferences
          membership: 'Standard Member', // Default or fetch from custom attributes if applicable
          avatar: my.src, // Use your imported image, or fetch a user-specific avatar URL
          
          // These arrays (addresses, payments, orders) are NOT part of Appwrite's default Account object.
          // You'll need to fetch these from Appwrite's Databases service
          // or from custom functions/collections if you want them dynamic.
          // For now, they remain static as in your original code,
          // or you can set them to empty arrays if they should only come from DB.
          addresses: [
            { id: 1, name: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'United States', phone: '+1 (555) 123-4567', isDefault: true },
            { id: 2, name: 'Work', street: '456 Business Ave', city: 'New York', state: 'NY', zip: '10002', country: 'United States', phone: '+1 (555) 987-6543', isDefault: false }
          ],
          paymentMethods: [
            { id: 1, type: 'Visa', last4: '4242', expiry: '12/25' }
          ],
          orders: [
            { id: 'ORD-12345', date: '2023-05-15', total: 129.99, status: 'Delivered', items: 3 },
            { id: 'ORD-12344', date: '2023-05-10', total: 59.99, status: 'Shipped', items: 2 }
          ],
          notifications: {
            email: loggedInUser.prefs?.emailNotifications ?? true, // Example: assuming notifications are in user preferences
            push: loggedInUser.prefs?.pushNotifications ?? true
          },
          twoFactorEnabled: loggedInUser.mfa || false, // Assuming mfa property directly
        });
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user data. Please ensure you are logged in.');

        if (err instanceof AppwriteException && err.code === 401) {
          // If the user is not authenticated (401 Unauthorized), redirect to login
          router.push('/login'); // Assuming you have a login page at /login
        } else {
          // Handle other errors if necessary
          setUser(null); // Clear user data on error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]); // Depend on router to avoid lint warnings, though it rarely changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => prev ? { ...prev, [name]: value } : null); // Ensure prev is not null
  };

  const setDefaultAddress = (id: number) => {
    setUser(prev => prev ? ({
      ...prev,
      addresses: prev.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    }) : null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-700">Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => router.push('/login')} 
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be covered by the error/redirect, but good for safety
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-700">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>My Profile | E-Commerce App</title>
        <meta name="description" content="Manage your account details" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-pink-500/20 to-yellow-500/20 px-6 py-8 text-black">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  className="w-20 h-20 rounded-full border-2 border-black"
                  src={Image2} // Use user.avatar if available, otherwise fallback to default
                  alt="User avatar"
                  width={80} // Add width and height for Next.js Image component
                  height={80}
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                  <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-black">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-white rounded-full">
                  {user.membership}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('personal')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'addresses' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Addresses
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'orders' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'payments' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Payments
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'settings' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                    {/* You might want to fetch email verification status from Appwrite later */}
                    <p className="mt-1 text-xs text-green-600">Verified</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={user.phone || ''} // Handle potential undefined phone
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{user.phone || 'N/A'}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dob"
                          value={user.dob || ''}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{user.dob || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={user.gender || ''}
                          // onChange={(e) => handleInputChange(e React.ChangeEvent<HTMLInputElement>)} // Cast to HTMLInputElement
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                          <option>Prefer not to say</option>
                        </select>
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{user.gender || 'N/A'}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          // TODO: Implement saving user data to Appwrite here
                          console.log('Saving user data:', user);
                          setIsEditing(false);
                        }}
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Addresses Tab - These will remain static unless you fetch from Appwrite Databases */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Address Book</h2>
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                    + Add New Address
                  </button>
                </div>

                <div className="space-y-6">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4 relative">
                      {address.isDefault && (
                        <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Default
                        </span>
                      )}
                      <h3 className="font-medium text-gray-900">{address.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {address.street}<br />
                        {address.city}, {address.state} {address.zip}<br />
                        {address.country}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Phone: {address.phone}</p>
                      <div className="mt-4 flex space-x-3">
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                          Edit
                        </button>
                        {!address.isDefault && (
                          <>
                            <button
                              onClick={() => setDefaultAddress(address.id)}
                              className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                            >
                              Set as default
                            </button>
                            <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab - These will remain static unless you fetch from Appwrite Databases */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order History</h2>

                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Order #
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Items
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Total
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {user.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {order.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {order.items}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              Track
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Reorder
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                    View all orders
                  </button>
                </div>
              </div>
            )}

            {/* Payments Tab - These will remain static unless you fetch from Appwrite Databases */}
            {activeTab === 'payments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                    + Add Payment Method
                  </button>
                </div>

                <div className="space-y-4">
                  {user.paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                          {method.type === 'Visa' && (
                            <span className="text-lg font-bold text-blue-800">VISA</span>
                          )}
                          {method.type === 'MasterCard' && (
                            <span className="text-lg font-bold text-red-800">MC</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• {method.last4}</p>
                          <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Security</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Password</p>
                          <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                          Change
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">
                            {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </p>
                        </div>
                        <button
                          onClick={() => setUser(prev => prev ? ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }) : null)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${user.twoFactorEnabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${user.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-500">Order updates, promotions, etc.</p>
                        </div>
                        <button
                          onClick={() => setUser(prev => prev ? ({ ...prev, notifications: { ...prev.notifications, email: !prev.notifications.email } }) : null)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${user.notifications.email ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${user.notifications.email ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                          <p className="text-sm text-gray-500">Order updates on your device</p>
                        </div>
                        <button
                          onClick={() => setUser(prev => prev ? ({ ...prev, notifications: { ...prev.notifications, push: !prev.notifications.push } }) : null)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${user.notifications.push ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${user.notifications.push ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Preferences</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <select
                          id="language"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <select
                          id="currency"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button className="text-red-600 hover:text-red-900 font-medium">
                      Delete Account
                    </button>
                    <p className="mt-1 text-sm text-gray-500">
                      Permanently remove your account and all associated data.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}