'use client'

import React, { useState } from 'react'

function MyDog() {
    const [dogs, setDogs] = useState<string[]>([]);
    const [newDog, setNewDog] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(false);

    const addDog = () => {
        if (newDog.trim() !== '') {
            setDogs([...dogs, newDog]);
            setNewDog('');
            setShowInput(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 border border-solid border-black p-5">
            <div
                className="flex flex-col items-center justify-center border border-solid border-black m-1 rounded-lg cursor-pointer"
                onClick={() => setShowInput(true)}
            >
                {showInput ? (
                    <div>
                        <input
                            type="text"
                            className="border p-2 mr-2"
                            placeholder="Enter dog name"
                            value={newDog}
                            onChange={(e) => setNewDog(e.target.value)}
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addDog}>
                            Add Dog
                        </button>
                    </div>
                ) : (
                    '+'
                )}
            </div>
            {dogs.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold mb-2">Registered Dogs</h2>
                    <ul>
                        {dogs.map((dog, index) => (
                            <li key={index} className="mb-2">
                                {dog}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MyDog