import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebaseAuth } from "../../../firebase/firebaseAuth";
import { AuthContext } from "./AuthContext";

const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const subscribe = onAuthStateChanged(firebaseAuth, (user) => {
            setCurrentUser(user);
        });
        return subscribe;
    }, []);

    return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
}

export default AuthProvider;