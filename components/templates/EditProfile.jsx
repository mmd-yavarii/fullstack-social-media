import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './EditProfile.module.css';

import { emailRegex } from '@/utils/regexes';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

import { PulseLoader } from 'react-spinners';

function EditProfile({ userInfo }) {
    const router = useRouter();
    const { bio, fullName, image, email } = userInfo;
    const [isLoading, setIsLoading] = useState(false);
    const [isChangePasssword, setIsChangePassword] = useState(false);

    const [form, setForm] = useState({
        bio: bio,
        fullName: fullName,
        image: image,
        email: email,
        currentPassword: '',
        newPassword: '',
    });

    // change inputs handler
    function changeHandler(event) {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // submit edit and chanege info handler
    async function submitHandler(event) {
        event.preventDefault();

        if (!emailRegex.test(form.email)) {
            alert('ایمیل معتبر نیست');
            return;
        }

        const confirmation = confirm('از تغیرات اطمینان دارید ؟');
        if (!confirmation) return;

        setIsLoading(true);
        const response = await fetch('/api/account/edit-profile', {
            method: 'PATCH',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        alert(result.message);
        if (response.ok) router.back();
        setIsLoading(false);
    }

    return (
        <>
            <div className="backBtn">
                <button onClick={() => router.back()}>
                    <IoMdArrowRoundBack size="1.5rem" />
                </button>
            </div>

            <form onSubmit={submitHandler} className={styles.editForm}>
                <div>
                    <label htmlFor="fullName">نام کامل</label>
                    <input type="text" id="fullName" name="fullName" placeholder="نام کامل" value={form.fullName} onChange={changeHandler} />
                </div>

                <div>
                    <label htmlFor="email">ایمیل</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="ایمیل"
                        value={form.email}
                        onChange={changeHandler}
                        autoComplete="username"
                    />
                </div>

                <div>
                    <label htmlFor="bio">بیو</label>
                    <textarea id="bio" name="bio" placeholder="بیو" value={form.bio} onChange={changeHandler} style={{ resize: 'none' }} />
                </div>

                {/* edit password session */}
                <span className={styles.changePassBtn} onClick={() => setIsChangePassword(!isChangePasssword)}>
                    <span>تغیر کلمه عبور</span>
                    {isChangePasssword ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                </span>

                {isChangePasssword && (
                    <>
                        <div>
                            <label htmlFor="currentPassword">کلمه عبور فعلی</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                placeholder="کلمه عبور فعلی"
                                value={form.currentPassword}
                                onChange={changeHandler}
                                autoComplete="current-password"
                            />
                        </div>

                        <div>
                            <label htmlFor="newPassword">کلمه عبور جدید</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="کلمه عبور جدید"
                                value={form.newPassword}
                                onChange={changeHandler}
                                autoComplete="new-password"
                            />
                        </div>
                    </>
                )}

                <button type={'submit'}>{isLoading ? <PulseLoader size="0.5rem" color="#fff" /> : 'اعمال تغیرات'}</button>
            </form>
        </>
    );
}

export default EditProfile;
