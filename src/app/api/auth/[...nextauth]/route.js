import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectionToDatabase from '../../../../../libs/mongoose';
import User from '../../../../../models/User';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectionToDatabase();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }

                    if (user.role !== 'admin') {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.error("Login Error: ", error.message);
                    return null;
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // Modify the JWT token to include firstname and lastname
        async jwt({ token, user }) {
            if (user) {
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token;
        },
        // Modify the session to include firstname and lastname from JWT token
        async session({ session, token }) {
            if (token) {
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
