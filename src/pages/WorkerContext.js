import React, { createContext, useState } from 'react';

export const WorkerContext = createContext();

export const WorkerProvider = ({ children }) => {
    const [workerID, setWorkerID] = useState(null);

    return (
        <WorkerContext.Provider value={{ workerID, setWorkerID }}>
            {children}
        </WorkerContext.Provider>
    );
};
