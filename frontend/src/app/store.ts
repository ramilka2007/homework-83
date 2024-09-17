import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { albumsReducer } from '../features/albums/albumSlice';
import { artistsReducer } from '../features/artists/artistsSlice';
import { tracksReducer } from '../features/tracks/tracksSlice';
import { usersReducer } from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {tracksHistoryReducer} from "../features/trackHistories/trackHistoriesSlice";

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

export const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  tracksHistory: tracksHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
