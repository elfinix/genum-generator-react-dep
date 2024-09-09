import { useState } from "react";
import { fetchWord, fetchDefinition } from "../../utils/word-generator/fetchWord";
import { formatWord } from "../../utils/word-generator/formatWord";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { validateInputWord } from "../../utils/word-generator/validateWordLength";

const parameter = {
    wordLength: 5,
};

const clipboardIcon = {
    copy: "/src/images/clipboard.svg",
    check: "/src/images/check.svg",
};

const WordGenerator = () => {
    const [generatedWord, setGeneratedWord] = useState(<>&nbsp;</>);
    const [fetchedDefinition, setFetchedDefinition] = useState("You can find its definition here.");

    const onClickGenerate = async () => {
        try {
            const generatedWord = await fetchWord(parameter.wordLength);

            if (generatedWord) {
                const fetchedDefinition = await fetchDefinition(generatedWord);
                setFetchedDefinition(fetchedDefinition);
            }

            setGeneratedWord(generatedWord);
        } catch (error) {
            console.error("Error in onClickGenerate:", error);
            setFetchedDefinition("Sorry, we couldn't fetch the data.");
        }
    };

    const onClickOptions = () => {
        let inputLength = parseInt(prompt("Enter word length (min: 3 / max: 9)"));
        parameter.wordLength = validateInputWord(inputLength);
    };

    const onClickDictionary = () => {
        window.open(`https://www.wordnik.com/words/${generatedWord}`);
    };

    const { copyIcon, onCopy } = copyToClipboard(generatedWord);

    return (
        <section class="main__container container" id="generate">
            <h1 class="main__title">Random Word Generator</h1>
            <p class="main__subtitle">
                Instantly generate random numbers for your needs, from simple draws to complex calculations.
            </p>

            <div class="output-trivia__container">
                <div class="output__container" onClick={onCopy}>
                    <img src={copyIcon} alt="Clipboard Icon" class="clipboard__label" />

                    <div class="output__group">
                        <p class="output__label">Click on the "Generate" button!</p>
                        <div class="output__word">{generatedWord}</div>
                    </div>
                </div>

                <div class="trivia-button__container">
                    <div class="trivia__container">
                        <div class="trivia__group">
                            <p class="trivia__label">{formatWord(generatedWord) || "Your word appears here!"}</p>
                            <p class="trivia__text">{fetchedDefinition}</p>
                        </div>
                    </div>

                    <div class="button-array__container">
                        <div class="button-options__container">
                            <button class="options__button options" onClick={onClickOptions}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="18"
                                    viewBox="0 0 19 18"
                                    fill="none"
                                >
                                    <path
                                        d="M13.7 0C13.3816 3.79149e-06 13.0763 0.126397 12.8512 0.351374C12.6261 0.576352 12.4996 0.881485 12.4996 1.19965V1.80006H1.70035C1.38201 1.80006 1.0767 1.92645 0.851591 2.15141C0.626483 2.37638 0.500013 2.68149 0.5 2.99965C0.499999 3.15719 0.531045 3.31318 0.591368 3.45873C0.651691 3.60428 0.740107 3.73653 0.85157 3.84792C0.963033 3.95932 1.09536 4.04769 1.24099 4.10798C1.38663 4.16826 1.54272 4.1993 1.70035 4.1993H12.4996V4.80041C12.4996 5.11857 12.6261 5.42371 12.8512 5.64868C13.0763 5.87366 13.3816 6.00005 13.7 6.00006C14.0184 6.00005 14.3237 5.87366 14.5488 5.64868C14.7739 5.42371 14.9004 5.11857 14.9003 4.80041V4.1993H17.2996C17.4572 4.1993 17.6133 4.16828 17.759 4.10799C17.9046 4.04771 18.0369 3.95934 18.1484 3.84794C18.2599 3.73655 18.3483 3.6043 18.4086 3.45874C18.469 3.31319 18.5 3.15719 18.5 2.99965C18.5 2.84211 18.4689 2.68612 18.4086 2.54057C18.3483 2.39503 18.2599 2.26278 18.1484 2.15139C18.0369 2.04 17.9046 1.95164 17.759 1.89136C17.6133 1.83108 17.4572 1.80005 17.2996 1.80006H14.9003V1.19965C14.9004 0.881485 14.7739 0.576352 14.5488 0.351374C14.3237 0.126397 14.0184 3.79149e-06 13.7 0ZM5 6C4.84236 5.99999 4.68626 6.03102 4.54062 6.0913C4.39498 6.15159 4.26265 6.23996 4.15118 6.35135C4.03971 6.46275 3.95129 6.595 3.89096 6.74055C3.83064 6.8861 3.79959 7.04211 3.79959 7.19965V7.8H1.7007C1.54307 7.8 1.38698 7.83103 1.24135 7.89132C1.09571 7.95161 0.963385 8.03998 0.851922 8.15137C0.740459 8.26277 0.652042 8.39502 0.59172 8.54057C0.531397 8.68611 0.50035 8.84211 0.500352 8.99965C0.50035 9.15719 0.531397 9.31318 0.59172 9.45873C0.652042 9.60428 0.740459 9.73653 0.851922 9.84792C0.963385 9.95932 1.09571 10.0477 1.24135 10.108C1.38698 10.1683 1.54307 10.1993 1.7007 10.1993H3.79959V10.8004C3.79959 10.958 3.83064 11.114 3.89096 11.2595C3.95129 11.4051 4.03971 11.5373 4.15118 11.6487C4.26265 11.7601 4.39498 11.8485 4.54062 11.9088C4.68626 11.969 4.84236 12.0001 5 12.0001C5.31836 12.0001 5.62367 11.8737 5.84878 11.6487C6.07389 11.4237 6.20035 11.1186 6.20035 10.8004V10.1993H17.3C17.4576 10.1993 17.6137 10.1683 17.7594 10.108C17.905 10.0477 18.0373 9.95932 18.1488 9.84792C18.2602 9.73653 18.3487 9.60428 18.409 9.45873C18.4693 9.31318 18.5004 9.15719 18.5004 8.99965C18.5004 8.84211 18.4693 8.68611 18.409 8.54057C18.3487 8.39502 18.2602 8.26277 18.1488 8.15137C18.0373 8.03998 17.905 7.95161 17.7594 7.89132C17.6137 7.83103 17.4576 7.8 17.3 7.8H6.20035V7.19965C6.20035 6.88148 6.07389 6.57635 5.84878 6.35137C5.62367 6.1264 5.31836 6 5 6ZM8.9 12.0001C8.58165 12.0001 8.27635 12.1264 8.05124 12.3514C7.82613 12.5764 7.69966 12.8815 7.69965 13.1996V13.8H1.7007C1.54307 13.8 1.38698 13.831 1.24135 13.8913C1.09571 13.9516 0.963385 14.04 0.851922 14.1514C0.740459 14.2628 0.652042 14.395 0.59172 14.5406C0.531397 14.6861 0.50035 14.8421 0.500352 14.9996C0.500364 15.3178 0.626835 15.6229 0.851943 15.8479C1.07705 16.0729 1.38236 16.1992 1.7007 16.1992H7.69965V16.8004C7.69966 17.1186 7.82613 17.4237 8.05124 17.6486C8.27635 17.8736 8.58165 18 8.9 18C9.21834 18 9.52365 17.8736 9.74876 17.6486C9.97387 17.4237 10.1003 17.1186 10.1004 16.8004V16.1992H17.3C17.6183 16.1992 17.9237 16.0729 18.1488 15.8479C18.3739 15.6229 18.5003 15.3178 18.5004 14.9996C18.5004 14.8421 18.4693 14.6861 18.409 14.5406C18.3487 14.395 18.2602 14.2628 18.1488 14.1514C18.0373 14.04 17.905 13.9516 17.7594 13.8913C17.6137 13.831 17.4576 13.8 17.3 13.8H10.1004V13.1996C10.1003 12.8815 9.97387 12.5764 9.74876 12.3514C9.52365 12.1264 9.21834 12.0001 8.9 12.0001Z"
                                        fill="#EEFBF2"
                                    />
                                </svg>
                            </button>
                            <button class="options__button dictionary" onClick={onClickDictionary}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="19"
                                    viewBox="0 0 22 19"
                                    fill="none"
                                >
                                    <path
                                        d="M21.9748 8.74178C21.8931 8.35752 21.6207 8.03982 21.2507 7.8972L19.9531 7.39801V8.71856L20.1988 8.81312C20.3097 8.85599 20.3915 8.95136 20.4157 9.06633C20.44 9.18169 20.4044 9.30189 20.3202 9.38522L11.9944 17.6267C11.8297 17.7894 11.5836 17.8407 11.3662 17.7573L1.7942 14.0721C1.26199 13.8725 1.26161 13.1558 1.32834 12.2279C1.3866 11.4242 1.64729 10.3713 2.55148 10.4209L10.8102 13.6005C11.5504 13.8854 12.3906 13.7091 12.9508 13.1514L20.933 5.19756C21.2123 4.91951 21.3313 4.52044 21.2491 4.13698C21.167 3.75319 20.895 3.43626 20.5258 3.2944L12.3178 0.134444C11.5775 -0.150458 10.7369 0.0258513 10.1771 0.583576L0.930101 9.79709C0.19873 10.3929 0 11.5039 0 12.4907C0 13.4775 0.0663867 14.6619 1.19642 15.1222L0.930101 15.0605L10.8146 18.8656C11.5528 19.1496 12.3906 18.9753 12.9508 18.4208L21.6559 9.80351C21.9364 9.52584 22.0566 9.12639 21.9748 8.74178Z"
                                        fill="#EEFBF2"
                                    />
                                </svg>
                            </button>
                        </div>

                        <button class="generate__button" onClick={onClickGenerate}>
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default WordGenerator;
