import { useRef } from "react";

export default function SignUpForm() {
  const inputRef = useRef(null);

  const subscribeUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/subscribeUser", {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  return (
    <div className="text-black  max-w-md mx-auto bg-white p-5 rounded-md shadow-sm">
      <div>
        <div>
          <form onSubmit={subscribeUser} className="space-y-4">
            <div>
              <input
                type="email"
                id="email-input"
                name="email"
                placeholder="Sign Up with Email & Read Stories Upon Launch"
                ref={inputRef}
                required
                autoCapitalize="off"
                autoCorrect="off"
                className="w-full border-2 border-purple-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                value=""
                name="subscribe"
                className="text-purple-500 w-full py-2 px-4 bg-blue-500  rounded-md hover:bg-blue-700"
              >
                Notify Me
              </button>
            </div>
          </form>
        </div>
      </div>
      <p>Or if you want to join the team, want to submit project, feel free to apply from the form https://forms.gle/wJFRaTayiFVDf5h77 </p>
    </div>
  );
}