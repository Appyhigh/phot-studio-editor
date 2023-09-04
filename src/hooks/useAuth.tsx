import { auth } from "../utils/firebase"
import { getIdToken, getIdTokenResult, onIdTokenChanged, signOut, User as GoogleUser } from "firebase/auth"
import { setCookie } from "nookies"
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react"
import { getUserInfo, upsertGoogleLoggedInUser } from "../services/user.service"
import { getPollingIntervals, storePollingIntervalCookies } from "../services/pollingIntervals.service"
import { destroyAllCookies, getCookie, GOOGLE_AUTH_SESSION_PERIOD } from "../utils/common"
import { COOKIE_KEYS, USER_PAYLOAD } from "../utils/enum"

interface NativeUser extends GoogleUser {
  createdAt?: string
  id?: string
  isActive?: boolean
  isDeleted?: boolean
  loginRetryLimit?: number
  loginType?: USER_PAYLOAD.LOGIN_TYPE
  packageId?: USER_PAYLOAD.PACKAGE_ID
  platform?: USER_PAYLOAD.PLATFORM
  updatedAt?: string
  avatar?: string
  available_credits?: any
  plan: string
  subscriptionDetails: any
  credits_remaining: number | string
  reqCountry: string
  total_credits?: any
  oneTimePurchaseDetails?: any
  subscriptionId?: string
  countryCode?: string
  freePlanDetails?: any
  credits_total?: number
  credits_used?: number
}

interface UserDetailsContext {
  user: NativeUser | null
  loading: boolean
  creditsData: any
  showLoginPopUp: boolean
  toolName: any
}

const userDefaults: UserDetailsContext = {
  user: null,
  loading: false,
  creditsData: { objectReplacer: null, backgroundReplacer: null, photoEditor: null },
  showLoginPopUp: false,
  toolName: null
}

const AuthContext = createContext<UserDetailsContext>(userDefaults)

function AuthWrapper({ children }: { children: ReactNode }): ReactElement {
  const [authState, setAuthState] = useState<any>({
    ...userDefaults,
    loading: true,
  })

  useEffect(() => {
    return onIdTokenChanged(auth(), async (user) => {
      setAuthState((prev: any) => ({ ...prev, loading: true }))
      if (!user) {
        // Destroying both old firebase and native token and set default user info
        destroyAllCookies()
        setAuthState(userDefaults)
      } else {
        if (user.email) {
          // Firebase auth token
          const idToken = await getIdTokenResult(user)

          // Set firebase token in cookie
          setCookie(null, COOKIE_KEYS.SESSION, idToken.token, { path: "/" })

          const { LOGIN_TYPE, PLATFORM, PACKAGE_ID } = USER_PAYLOAD

          const userPayload = {
            name: user.displayName,
            profilePic: user.photoURL,
            email: user.email,
            googleToken: idToken.token,
            loginType: LOGIN_TYPE,
            platform: PLATFORM,
            packageId: PACKAGE_ID,
            photoURL: user.photoURL,
          }

          // Post user details to backend after google login
          upsertGoogleLoggedInUser(userPayload)
            .then((data) => {
              const { accessToken = null, user = null } = data

              if (accessToken && user) {
                setCookie(null, COOKIE_KEYS.AUTH, accessToken, { path: "/" })

                getUserInfo()
                  .then((data) => {
                    if (data) {
                      // Set user details in auth-state
                      setAuthState((prev: any) => ({
                        ...prev,
                        user: {
                          ...user,
                          freePlanDetails: { ...data?.freePlanDetails },
                          previousPlanDetails: { ...data?.previousPlanDetails },
                          subscriptionDetails: { ...data?.subscriptionDetails },
                          oneTimePurchaseDetails: { ...data?.oneTimePurchaseDetails },
                          credits_remaining: data?.credits_remaining,
                          credits_total: data?.credits_total,
                          credits_used: data?.credits_used,
                          plan: data?.plan,
                          reqCountry: `${getCookie(COOKIE_KEYS.COUNTRY)}`,
                        },
                        loading: false,
                      }))
                    }
                  })
                  .catch((err) => {
                    setAuthState(userDefaults)
                    console.log(err.message, "error while fetching user data")
                  })

                // After user login and getting access token, get polling intervals list for tools
                getPollingIntervals()
                  .then((res: any) => {
                    // Store polling intervals
                    storePollingIntervalCookies(res)
                  })
                  .catch(() => {
                    // an error occured so we rely on fallback polling intervals for each tool in this case
                  })
              }
            })
            .catch(() => {
              // Unable to log the user in to our backend - no access token, no phot-ai specific user info therefore, best to log them out through google and show error logging in
              signOut(auth()).then(() => {
                setAuthState(userDefaults)
              })
            })
        }
      }
    })
  }, [])

  useEffect(() => {
    // Automatically Refresh Firebase ID Token Every 15 Minutes
    const autoRefresh = setInterval(async () => {
      try {
        setAuthState((prev: any) => ({ ...prev, loading: true }))
        const user = auth().currentUser
        if (user) {
          await getIdToken(user, true)
          const data = await getUserInfo()

          if (data) {
            setAuthState((prev: any) => ({
              ...prev,
              user: {
                ...user,
                freePlanDetails: { ...data?.freePlanDetails },
                previousPlanDetails: { ...data?.previousPlanDetails },
                subscriptionDetails: { ...data?.subscriptionDetails },
                oneTimePurchaseDetails: { ...data?.oneTimePurchaseDetails },
                credits_remaining: data?.credits_remaining,
                credits_total: data?.credits_total,
                credits_used: data?.credits_used,
                plan: data?.plan,
                reqCountry: `${getCookie(COOKIE_KEYS.COUNTRY)}`,
              },
              loading: false,
            }))
          }
        }
      } catch (error: any) {
        setAuthState(userDefaults)
        console.log("error in user auth", error.message)
      }
    }, GOOGLE_AUTH_SESSION_PERIOD)

    return () => clearInterval(autoRefresh)
  }, [])

  // @ts-ignore
  return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>
}

export default AuthWrapper

export const useAuth = () => useContext(AuthContext)
