const ProgressBar = ({ percentage }) => {
    return (
        <div
            className="progress-container"
            style={{
                width: '100%',
                backgroundColor: '#e0e0e0', borderRadius: '4px'
            }}>
        <div 
            className="progress-bar" 
            style={{ 
                width: `${percentage}`,
                height: '10px',
                backgroundColor: '#58a6ff',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
            }}
        ></div>
        </div>
    );
};

export default ProgressBar;