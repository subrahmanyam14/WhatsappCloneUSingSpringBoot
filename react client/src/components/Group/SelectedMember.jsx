import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const SelectedMember = ({member,handleRemoveMember}) => {
  return (
    <div className='flex items-center bg-slate-300 rounded-full'>
        <img className='w-7 h-7 rounded-full ' src={member.profile_picture ||"https://cdn.pixabay.com/photo/2022/10/06/13/17/monks-7502654__340.jpg"} alt="" />
        <p className='px-2'>{member.full_name}</p>
        <AiOutlineClose onClick={handleRemoveMember} className='pr-1 cursor-pointer'/>
    </div>
  )
}

export default SelectedMember