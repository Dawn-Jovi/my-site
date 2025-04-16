import QRnot from '../assets/QRnot.jpg'
function QRNot() {
    return (
        <div style={{ textAlign: 'center' }}>
            <img
                className='qr-img'
                style={{
                    width: 600 ,
                    height: 600
                }}   
                src={QRnot} alt='' />
        </div>
    )
}
export default QRNot;