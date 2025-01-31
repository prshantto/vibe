import { useEffect, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import NavBar from "../components/NavBar";
import { THEME } from "../recoil/constant";
import { useRecoilState } from "recoil";
import { themeAtom } from "../recoil/atom";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const Settings = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [isLoading, setIsLoading] = useState(false);

  const storedUserDataString = localStorage.getItem("user");
  const storedUserData = storedUserDataString
    ? JSON.parse(storedUserDataString)
    : null;

  const isEmailVerified =
    auth.currentUser?.emailVerified || storedUserData.emailVerified;
  const handleEmailVerification = async () => {
    if (!isEmailVerified) {
      setIsLoading(true);
      await sendEmailVerification(auth.currentUser);
    } else {
      alert("Email already verified");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <NavBar />

      <div className=" min-h-screen flex flex-col items-center gap-5">
        {!isEmailVerified ? (
          isLoading ? (
            // <div className="w-[90%] p-3">Loading...</div>
            <div className="w-[90%] p-3 mt-5 font-bold text-2xl">
              Verification Email Sent!{" "}
            </div>
          ) : (
            <div className="w-[90%] p-3 mt-5 text-lg rounded-lg">
              <h1 className="font-bold text-2xl">Your Email is not verified</h1>
              <button
                onClick={handleEmailVerification}
                className="px-4 py-2 bg-primary rounded-lg my-2"
              >
                Click to Verify your Email
              </button>
            </div>
          )
        ) : null}

        <div className="themes w-[90%] p-3 rounded-lg">
          <div>
            <h1 className="font-bold text-2xl">THEMES</h1>
            <p className="text-md mb-2">Choose your theme!</p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {THEME.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                  ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="preview w-[90%] rounded-lg bg-secondary my-5">
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }
                        `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                            text-[10px] mt-1.5
                            ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }
                          `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
