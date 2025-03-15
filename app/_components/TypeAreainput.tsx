import useClickOutside from "@/hooks/useClickOutside";
import useKeyPress from "@/hooks/useKeyBoardPress";
import { getElementPositionInContainer } from "@/utils/getElementPosition";
import { useEffect, useRef, useState } from "react";

const TypeAreainput = ({
  words,
  text,
  setText,
}: {
  words: string[];
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const containerRef = useClickOutside<HTMLDivElement>(() => {
    setisfocused(false);
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [isfocused, setisfocused] = useState(true);

  const inside = () => {
    inputRef.current?.focus();
  };

  const inputFocus = () => {
    setisfocused(true);
  };
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;
    if (value.trim() === "") setText("");
    else setText(value.replaceAll("  ", " "));
  };
  useKeyPress(inside);
  const textArray = text.split(" ");
  const lastLetter = useRef<HTMLSpanElement>(null);

  const [latestPosition, setLatestPosition] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    if (lastLetter.current) {
      const position = getElementPositionInContainer(
        lastLetter.current,
        containerRef.current!,
        !lastLetter.current.classList.contains("text-sub-color")
      );

      setLatestPosition(position);
    }
  }, [text, lastLetter, containerRef]);
  return (
    <div
      className={`relative overflow-hidden h-[141px] cursor-default`}
    >
      {isfocused && (
        <div
          id="caret"
          style={{
            left: `${latestPosition.x}px`,
            top: `${latestPosition.y}px`,
          }}
          className=" animate-pulse text-[2rem] h-[1.2em] w-[.1em] absolute bg-main-color origin-top-left"
        />
      )}
      {!isfocused && (
        <div
          onClick={inside}
          className="absolute inset-0 grid place-content-center text-[1rem]"
        >
          Click here or press any key to focus
        </div>
      )}

      <div
        ref={containerRef}
        className={`container select-none flex flex-wrap text-[2rem] transition-all ${
          isfocused ? "" : "blur-xs opacity-25"
        }`}
        onClick={inside}
      >
        {words.map((word, w) => {
          const typedWord = textArray[w];

          const extra = typedWord?.slice(
            word.length,
            typedWord.length
          );
          const isLastword = textArray?.length - 1 === w;

          return (
            <div
              className={`text-[1em] leading-[1em] m-[.25em_.3em] border-b-2 ${
                textArray?.length - 1 > w && typedWord !== word
                  ? " border-error-color"
                  : "border-transparent"
              }`}
              key={w}
            >
              {word.split("").map((letter, l) => {
                const isLastLetter = typedWord?.length - 1 === l;
                return (
                  <span
                    key={`${word}-${l}`}
                    className={`transition-colors inline-block ${
                      typedWord?.[l]
                        ? typedWord?.[l].toLowerCase() ===
                          letter.toLowerCase()
                          ? "text-text-color"
                          : "text-error-color"
                        : "text-sub-color"
                    }`}
                    ref={
                      (extra?.length === 0 &&
                        isLastLetter &&
                        isLastword) ||
                      (isLastword && typedWord === "" && l === 0)
                        ? lastLetter
                        : null
                    }
                  >
                    {letter}
                  </span>
                );
              })}

              {extra && (
                <span
                  ref={
                    isLastword && typedWord.length >= word.length
                      ? lastLetter
                      : null
                  }
                  className="text-error-extra-color"
                >
                  {extra}
                </span>
              )}
            </div>
          );
        })}
        <input
          ref={inputRef}
          onFocus={inputFocus}
          onChange={inputChange}
          value={text}
          type="text"
          className="sr-only"
        />
      </div>
    </div>
  );
};
export default TypeAreainput;
