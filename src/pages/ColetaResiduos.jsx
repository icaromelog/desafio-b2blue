import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { 
    Snackbar,
    Alert,
    Container, 
    Typography, 
    TextField, 
    Card, 
    CardContent, 
    Button, 
    CircularProgress, 
    Box, 
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import LiquorIcon from '@mui/icons-material/Liquor';
import ScienceIcon from '@mui/icons-material/Science';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const StationCard = ({ station, index, handleStationChange, handleCollectRequest }) => {
    const icons = {
        Vidro: <LiquorIcon sx={{ fontSize: '2rem', color: station.value > 79 ? 'var(--blue-300)' : 'var(--blue-500)' }}/>,
        Químicos: <ScienceIcon sx={{ fontSize: '2rem', color: station.value > 79 ? 'var(--blue-300)' : 'var(--blue-500)' }}/>,  
        Orgânico: <LocalFloristIcon sx={{ fontSize: '2rem', color: station.value > 79 ? 'var(--blue-300)' : 'var(--blue-500)' }}/>,
        REEE: <DeveloperBoardIcon sx={{ fontSize: '2rem', color: station.value > 79 ? 'var(--blue-300)' : 'var(--blue-500)' }}/>
    };

    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card elevation={0}>
                <CardContent>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress 
                            sx={{ color: station.value > 79 ? 'var(--blue-300)' : 'var(--blue-500)' }} 
                            size={75} 
                            variant="determinate" 
                            value={station.value} 
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {icons[station.name]}
                        </Box>
                    </Box>
                    <Typography 
                        sx={{ fontWeight: '600', fontSize: '1.1em', display: 'block', color: station.value > 79 ? 'var(--blue-300)' : 'var(--blue-500)' }} 
                        variant="h7" 
                        gutterBottom
                    >
                        {station.name}
                    </Typography>
                    <TextField
                        sx={{ fontSize: '13px', my: 1.5 }}
                        label="Quantidade armazenada (%)"
                        type="number"
                        value={station.value}
                        InputProps={{ inputProps: { min: "0", max: "100", step: "1" } }}
                        onChange={(e) => handleStationChange(index, Number(e.target.value))}
                        fullWidth
                    />
                    <Button 
                        size="large"
                        startIcon={<RecyclingIcon />}
                        sx={{ mt: 1, backgroundColor: station.value > 79 ? 'var(--blue-300)' : 'var(--blue-500)', textTransform: 'none' }} 
                        onClick={() => handleCollectRequest(station)} 
                        variant="contained" 
                        disableElevation 
                        color="primary"
                    >
                        Solicitar Coleta
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default function ColetaResiduos() {
    const [openDialog, setDialogOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedStation, setSelectedStation] = useState('');
    const [loading, setLoading] = useState(false);

    const [stations, setStations] = useState([
        { name: 'Vidro', value: 25 },
        { name: 'Químicos', value: 10 },
        { name: 'Orgânico', value: 65 },
        { name: 'REEE', value: 55 }
    ]);

    useEffect(() => {
        stations.forEach(station => {
            if (station.value >= 80) {
                handleCollectRequest(station);
            }
        });
    }, [stations]);

    const handleCollectRequest = (station) => {
        setDialogOpen(true);
        setSelectedStation(station.name);
    };

    const handleConfirmCollection = () => {
        console.log(selectedStation);
        const station = stations.find(station => station.name === selectedStation);
        setLoading(true);

        setTimeout(() => {
            if (station) {
                station.value = 0;
                setStations([...stations]);
            }
            setLoading(false);
            setDialogOpen(false);
            setOpenSnackbar(true);
        }, 2000); 
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleStationChange = (index, value) => {
        const newStations = [...stations];
        newStations[index].value = value;
        setStations(newStations);
    };

    return (
        <Container maxWidth={false}>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Confirmar Coleta de ${selectedStation}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você tem certeza que deseja confirmar a coleta de <b>{selectedStation}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>

                    <LoadingButton
                        onClick={handleConfirmCollection}
                        endIcon={<ThumbUpAltIcon />}
                        loading={loading}
                        loadingPosition="end"
                        color="primary"
                        variant="contained">
                        Confirmar
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <Grid container spacing={3}>
                {stations.map((station, index) => (
                    <StationCard 
                        key={index} 
                        station={station} 
                        index={index} 
                        handleStationChange={handleStationChange} 
                        handleCollectRequest={handleCollectRequest} 
                    />
                ))}
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                Pedido de Coletada de {selectedStation} confirmado com sucesso!
                </Alert>
            </Snackbar>
        </Container>
    );
}
