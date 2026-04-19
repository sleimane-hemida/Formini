import { useState, useEffect, useRef } from 'react';

export function useAutoSave(hasChanges, handleSave, delaySeconds = 30) {
	const [autoSaveTimer, setAutoSaveTimer] = useState(null);
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = handleSave;
	}, [handleSave]);

	useEffect(() => {
		let timeout = null;

		if (hasChanges && autoSaveTimer === null) {
			setAutoSaveTimer(delaySeconds);
		} else if (hasChanges && autoSaveTimer !== null) {
			if (autoSaveTimer > 0) {
				timeout = setTimeout(() => {
					setAutoSaveTimer(autoSaveTimer - 1);
				}, 1000);
			} else if (autoSaveTimer === 0) {
				if (savedCallback.current) {
					savedCallback.current();
				}
				setAutoSaveTimer(null);
			}
		} else if (!hasChanges && autoSaveTimer !== null) {
			setAutoSaveTimer(null);
		}

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [hasChanges, autoSaveTimer, delaySeconds]);

	return autoSaveTimer;
}
