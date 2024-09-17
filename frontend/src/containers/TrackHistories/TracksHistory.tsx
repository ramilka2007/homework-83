import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from "../../features/users/usersSlice";
import {getTrackToHistory} from "../../features/trackHistories/tracksHistoryThunk";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import TrackHistoryCard from "../../components/TrackHistoryCard/TrackHistoryCard";
import Spinner from "../../UI/Spinner/Spinner";

const TracksHistory = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const trackHistory = useSelector((state: RootState) => state.tracksHistory.trackHistory);
    const loading = useSelector((state: RootState) => state.tracksHistory.isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            dispatch(getTrackToHistory());
        }
    }, [user, dispatch]);

    return (
        <div className="container">
            {loading ? <Spinner/> :
                <>
                    {trackHistory.map(trackFromHistory => (
                        <TrackHistoryCard key={trackFromHistory._id + 1} trackFromHistory={trackFromHistory}/>
                    ))}
                </>
            }
        </div>
    )
};

export default TracksHistory;