export const AudioPlayer = ({previewUrl}) => {
   
    return (
        <div>
            {previewUrl ? (
                <audio controls>
                    <source src={previewUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <p>No audio.</p>
            )}
        </div>
    )
}