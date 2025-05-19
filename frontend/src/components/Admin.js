import React from 'react';

function Admin() {
  return (
    <div>
      <h2 style={{"padding":"18px"}}>Paver Block Summary</h2>
      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRL40ViIHwyyF8DKVjgb6NcR2QaUO0ssHooiUhNSFhTgixKLxKXB5L7c2J2xPFK6uzNeNe7mJsWdk8D/pubhtml?gid=570838535&single=true"
        width="100%"
        height="600"
        title="Paver Block Summary"
        style={{ border: 'none', padding: '18px' }}
      ></iframe>
    </div>
  );
}

export default Admin;