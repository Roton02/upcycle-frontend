// Function to generate a random gradient
const generateRandomGradient = () => {
  const color1 = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  const color2 = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  return `linear-gradient(45deg, ${color1}, ${color2})`;
};

const UserAvater = ({ userName }: { userName: string }) => {
  // Get the first character of the user's name
  const firstChar = userName.charAt(0).toUpperCase();

  // Generate random gradient background
  const randomGradient = generateRandomGradient();

  return (
    <div
      className="w-9 h-9 rounded-full text-xl font-bold"
      style={{
        background: randomGradient,
      }}
    >
      <span className="flex items-center justify-center w-full h-full text-white">
        {firstChar}
      </span>
    </div>
  );
};

export const UserAvaterLG = ({ userName }: { userName: string }) => {
  // Get the first character of the user's name
  const firstChar = userName.charAt(0).toUpperCase();

  // Generate random gradient background
  const randomGradient = generateRandomGradient();

  return (
    <div
      className="w-12 h-12 rounded-full text-2xl font-bold"
      style={{
        background: randomGradient,
      }}
    >
      <span className="flex items-center justify-center w-full h-full text-white">
        {firstChar}
      </span>
    </div>
  );
};

export default UserAvater;
