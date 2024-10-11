export const AudioPlayer = ({previewUrl}) => {
   
    return (
        <div>
            {previewUrl ? (
                <audio controls ref={(audio) => { if (audio) audio.volume = 0.3; }}>
                    <source src={previewUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p>No audio.</p>
            )}
        </div>
    )
}