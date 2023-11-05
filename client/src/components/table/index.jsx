import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import Cookies from "universal-cookie";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh', // Sayfaya sığacak şekilde maksimum yükseklik ayarlayın
    overflowY: 'auto',
    textAlign: "center",
  };



const Table = ({ data }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div key={data.id} className="inline-flex">
        <Button onClick={handleOpen}>
            {data.link}
        </Button>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{position:"relative"}}>
              {data.link}
            </Typography>
              
              <div>
                {data.sslResults.map((data, index)=>(
                <table key={index}>
                    <tbody>
                    <tr>
                        <td>Valid From</td>
                        <td>{data.validFrom}</td>
                    </tr>
                    <tr>
                        <td>Valid To</td>
                        <td>{data.validTo}</td>
                    </tr>
                    <tr>
                        <td>Fingerprint</td>
                        <td>{data.fingerPrint}</td>
                    </tr>
                    <tr>
                        <td>Serial Number</td>
                        <td>{data.serialNumber}</td>
                    </tr>
                    <tr>
                        <td>Info Access</td>
                        <td>{0}</td>
                    </tr>
                  </tbody>
                </table>
                ))}
              </div>
          
          </Box>
        </Modal>
      </div>
    );
}

export default Table