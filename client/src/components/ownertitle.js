

const OwnerTitle = ({title, subTitle, align}) => {
  return (
    <div className="flex flex-col gap-4 mb-6  ">
        <h3 className='font-bold text-xl md:text-[40px]'>{title}</h3>
        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-156 '>{subTitle}</p>

    </div>
  )
}

export default OwnerTitle