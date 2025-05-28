const BuyButtonArray = () => {
    return (
        <>
        {
            (import.meta.env.PROD) ? (
                <>
                    <stripe-buy-button
                        buy-button-id="buy_btn_1QjP5SAL4Wig1Koweya8w0xm"
                        publishable-key="pk_live_51QdZqlAL4Wig1Kow4pYOeL8fe14CioHTbV2tc8knOWlq2kMLWhuu5auyK2gzhaLXxILLhogAwL5mqmwugtpTEQR500Ui49x6oE"
                    />
                    <stripe-buy-button
                        buy-button-id="buy_btn_1QjW69AL4Wig1KowlxOcCuwp"
                        publishable-key="pk_live_51QdZqlAL4Wig1Kow4pYOeL8fe14CioHTbV2tc8knOWlq2kMLWhuu5auyK2gzhaLXxILLhogAwL5mqmwugtpTEQR500Ui49x6oE"
                    />
                </>
            ) : (
                <>
                    <stripe-buy-button
                        buy-button-id="buy_btn_1QjPUQAL4Wig1KowXGWwFvWw"
                        publishable-key="pk_test_51QdZqlAL4Wig1KowaDAcVSJlfSRrzBZ0bP1Gm02VnqRpOQAMHBt12l68nshSiJyw9KARSIARrxhM1KhBQ6XXbPhQ00PBi0mMAt"
                    />
                    <stripe-buy-button
                        buy-button-id="buy_btn_1QjW43AL4Wig1KowwKRwUWq3"
                        publishable-key="pk_test_51QdZqlAL4Wig1KowaDAcVSJlfSRrzBZ0bP1Gm02VnqRpOQAMHBt12l68nshSiJyw9KARSIARrxhM1KhBQ6XXbPhQ00PBi0mMAt"
                    />
                </>
            )
        }
        </>
    );
};

export default BuyButtonArray