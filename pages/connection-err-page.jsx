// pages/connection-error.js
export default function ConnectionErrPage() {
    return (
        <>
            <div style={{ textAlign: 'center', padding: '50px', marginTop: '200px' }}>
                <h1>❌ Connection Error</h1>
                <p>We could not connect to the database. Please try again later.</p>

                <button
                    onClick={() => window.location.replace('/')}
                    style={{
                        textAlign: 'center',
                        padding: '7px 50px',
                        backgroundColor: 'transparent',
                        border: '1px solid',
                        borderRadius: '10px',
                        margin: '30px',
                    }}
                >
                    Reload
                </button>
            </div>
        </>
    );
}
