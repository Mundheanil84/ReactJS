import React, { useEffect, useState } from 'react';

function GitHub() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Fetch user profile
    fetch('https://api.github.com/users/Mundheanil84')
      .then(response => {
        if (!response.ok) throw new Error('User not found');
        return response.json();
      })
      .then(data => {
        setUserData(data);
        
        // Fetch user repositories after getting profile
        return fetch(data.repos_url);
      })
      .then(response => response.json())
      .then(repoData => setRepos(repoData))
      .catch(error => console.error('Error:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      Loading GitHub data...
    </div>
  );

  return (
    <div className='max-w-2xl mx-auto bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg'>
      {/* Tabs Navigation */}
      <div className='flex border-b border-gray-700'>
        <button
          className={`px-4 py-2 ${activeTab === 'profile' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'repos' ? 'bg-gray-700' : ''}`}
          onClick={() => setActiveTab('repos')}
        >
          Repositories ({repos.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className='p-6'>
        {activeTab === 'profile' && userData && (
          <div className='space-y-4'>
            <div className='flex items-center space-x-4'>
              <img 
                src={userData.avatar_url} 
                alt="Profile" 
                className='w-20 h-20 rounded-full'
              />
              <div>
                <h2 className='text-2xl font-bold'>{userData.name || userData.login}</h2>
                <p className='text-gray-400'>{userData.bio || 'No bio available'}</p>
              </div>
            </div>
            
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div className='bg-gray-700 p-3 rounded'>
                <div className='text-xl font-bold'>{userData.followers}</div>
                <div className='text-sm text-gray-400'>Followers</div>
              </div>
              <div className='bg-gray-700 p-3 rounded'>
                <div className='text-xl font-bold'>{userData.following}</div>
                <div className='text-sm text-gray-400'>Following</div>
              </div>
              <div className='bg-gray-700 p-3 rounded'>
                <div className='text-xl font-bold'>{userData.public_repos}</div>
                <div className='text-sm text-gray-400'>Repos</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'repos' && (
          <div className='space-y-3'>
            {repos.map(repo => (
              <div key={repo.id} className='p-3 bg-gray-700 rounded hover:bg-gray-600'>
                <a 
                  href={repo.html_url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='block'
                >
                  <h3 className='font-bold text-lg'>{repo.name}</h3>
                  <p className='text-gray-400 text-sm'>{repo.description || 'No description'}</p>
                  <div className='flex space-x-4 mt-2 text-sm'>
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHub;