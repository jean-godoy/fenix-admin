<div className="form-group">
                                <label htmlFor=""><b>Arquivo O.P:</b></label>
                                {/* <input type="file" className="form-input" name="op_file" onChange={e=>setOp(e.target.files[0])} required /> */}
                                <input type="file" className="form-input" name="op_file" onChange={handOPp} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Arquivo NF-e:</b></label>
                                {/* <input type="file" className="form-input" name="nfe_file" onChange={e=>setNfe(e.target.files[0])} required /> */}
                                <input type="file" className="form-input" name="nfe_file" onChange={handNfe} required />
                            </div>